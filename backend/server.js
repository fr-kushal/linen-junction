const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ================= DATABASE =================
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error(err.message);
  else {
    console.log("Connected to SQLite DB ✅");

    // ✅ IMPORTANT FIXES
    db.run("PRAGMA journal_mode = WAL;");
    db.configure("busyTimeout", 5000);
  }
});

// ================= TABLES =================

// PRODUCTS
db.run(`
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT,
  sku TEXT,
  pricePerMeter REAL,
  category TEXT,
  description TEXT,
  image TEXT
)`);

// CUSTOMERS
db.run(`
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT
)`);

// ORDERS
db.run(`
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_id TEXT,
  total_amount REAL,
  status TEXT,
  created_at TEXT
)`);

// ORDER ITEMS
db.run(`
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT,
  product_id TEXT,
  quantity REAL,
  price REAL
)`);

// TAILORING
db.run(`
CREATE TABLE IF NOT EXISTS tailoring (
  id TEXT PRIMARY KEY,
  order_id TEXT,
  measurements TEXT,
  style TEXT,
  notes TEXT
)`);

// ================= SOCKET =================
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

setInterval(() => {
  io.emit("analytics", {
    users: Math.floor(Math.random() * 50),
    orders: Math.floor(Math.random() * 50),
  });
}, 2000);

// ================= API =================

// 🔹 ADD PRODUCT
app.post("/api/products", upload.single("image"), (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const name = req.body.name || "";
    const sku = req.body.sku || "";
    const pricePerMeter = Number(req.body.pricePerMeter || 0);
    const category = req.body.category || "";
    const description = req.body.description || "";

    const id = Date.now().toString();
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    db.serialize(() => {
      db.run(
        `INSERT INTO products 
        (id, name, sku, pricePerMeter, category, description, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, name, sku, pricePerMeter, category, description, imagePath],
        function (err) {
          if (err) {
            console.error("DB ERROR:", err.message);
            return res.status(500).json({ error: err.message });
          }

          return res.json({ success: true });
        },
      );
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// 🔹 GET PRODUCTS
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🔹 CREATE ORDER
app.post("/api/orders", (req, res) => {
  const { customer, items, tailoring } = req.body;

  const orderId = Date.now().toString();
  const customerId = Date.now().toString();

  db.serialize(() => {
    // customer
    db.run(`INSERT INTO customers VALUES (?, ?, ?, ?, ?)`, [
      customerId,
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
    ]);

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // order
    db.run(`INSERT INTO orders VALUES (?, ?, ?, ?, ?)`, [
      orderId,
      customerId,
      total,
      "Pending",
      new Date().toISOString(),
    ]);

    // items
    items.forEach((item) => {
      db.run(`INSERT INTO order_items VALUES (?, ?, ?, ?, ?)`, [
        Date.now().toString() + Math.random(),
        orderId,
        item.product_id,
        item.quantity,
        item.price,
      ]);
    });

    // tailoring
    if (tailoring) {
      db.run(`INSERT INTO tailoring VALUES (?, ?, ?, ?, ?)`, [
        Date.now().toString(),
        orderId,
        JSON.stringify(tailoring.measurements),
        tailoring.style,
        tailoring.notes,
      ]);
    }

    res.json({ success: true });
  });
});

// 🔹 GET ORDERS (FULL DATA)
app.get("/api/orders", (req, res) => {
  db.all(`SELECT * FROM orders`, [], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });

    const promises = orders.map((order) => {
      return new Promise((resolve) => {
        db.all(
          `SELECT * FROM order_items WHERE order_id = ?`,
          [order.id],
          (err, items) => {
            db.get(
              `SELECT * FROM customers WHERE id = ?`,
              [order.customer_id],
              (err, customer) => {
                db.get(
                  `SELECT * FROM tailoring WHERE order_id = ?`,
                  [order.id],
                  (err, tailoring) => {
                    resolve({
                      ...order,
                      items,
                      customer,
                      tailoring: tailoring
                        ? {
                            ...tailoring,
                            measurements: JSON.parse(
                              tailoring.measurements || "{}",
                            ),
                          }
                        : null,
                    });
                  },
                );
              },
            );
          },
        );
      });
    });

    Promise.all(promises).then((data) => res.json(data));
  });
});

// 🔹 DELETE ORDER
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;

  db.serialize(() => {
    db.run(`DELETE FROM order_items WHERE order_id = ?`, [id]);
    db.run(`DELETE FROM tailoring WHERE order_id = ?`, [id]);
    db.run(`DELETE FROM orders WHERE id = ?`, [id]);

    res.json({ success: true });
  });
});

// 🔹 UPDATE STATUS
app.put("/api/orders/:id/status", (req, res) => {
  const { status } = req.body;

  db.run(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ success: true });
    },
  );
});

// 🔹 UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, sku, pricePerMeter, category, description } = req.body;

  db.run(
    `UPDATE products 
     SET name = ?, sku = ?, pricePerMeter = ?, category = ?, description = ?
     WHERE id = ?`,
    [name, sku, pricePerMeter, category, description, id],
    function (err) {
      if (err) {
        console.error("UPDATE ERROR:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ success: true });
    },
  );
});

// 🔹 UPDATE TAILORING STATUS
app.put("/api/tailoring/:orderId/status", (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  db.run(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, orderId],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }

      res.json({ success: true });
    },
  );
});

// 🔹 TEST
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= START =================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
