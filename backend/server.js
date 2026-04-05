const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");

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
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ================= INIT TABLES =================
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        sku TEXT,
        pricePerMeter REAL,
        category TEXT,
        description TEXT,
        image TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT,
        email TEXT,
        address TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_id TEXT,
        total_amount REAL,
        status TEXT,
        created_at TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT,
        product_id TEXT,
        quantity REAL,
        price REAL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tailoring (
        id TEXT PRIMARY KEY,
        order_id TEXT,
        measurements TEXT,
        style TEXT,
        notes TEXT
      );
    `);

    console.log("PostgreSQL tables ready ✅");
  } catch (err) {
    console.error("DB INIT ERROR:", err);
  }
};

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
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const name = req.body.name || "";
    const sku = req.body.sku || "";
    const pricePerMeter = Number(req.body.pricePerMeter || 0);
    const category = req.body.category || "";
    const description = req.body.description || "";

    const id = Date.now().toString();
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    await pool.query(
      `INSERT INTO products 
      (id, name, sku, pricePerMeter, category, description, image)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [id, name, sku, pricePerMeter, category, description, imagePath],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 CREATE ORDER
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, tailoring } = req.body;

    const orderId = Date.now().toString();
    const customerId = Date.now().toString();

    await pool.query(`INSERT INTO customers VALUES ($1,$2,$3,$4,$5)`, [
      customerId,
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
    ]);

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await pool.query(`INSERT INTO orders VALUES ($1,$2,$3,$4,$5)`, [
      orderId,
      customerId,
      total,
      "Pending",
      new Date().toISOString(),
    ]);

    for (const item of items) {
      await pool.query(`INSERT INTO order_items VALUES ($1,$2,$3,$4,$5)`, [
        Date.now().toString() + Math.random(),
        orderId,
        item.product_id,
        item.quantity,
        item.price,
      ]);
    }

    if (tailoring) {
      await pool.query(`INSERT INTO tailoring VALUES ($1,$2,$3,$4,$5)`, [
        Date.now().toString(),
        orderId,
        JSON.stringify(tailoring.measurements),
        tailoring.style,
        tailoring.notes,
      ]);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET ORDERS
app.get("/api/orders", async (req, res) => {
  try {
    const ordersRes = await pool.query("SELECT * FROM orders");

    const data = await Promise.all(
      ordersRes.rows.map(async (order) => {
        const items = await pool.query(
          "SELECT * FROM order_items WHERE order_id = $1",
          [order.id],
        );

        const customer = await pool.query(
          "SELECT * FROM customers WHERE id = $1",
          [order.customer_id],
        );

        const tailoring = await pool.query(
          "SELECT * FROM tailoring WHERE order_id = $1",
          [order.id],
        );

        return {
          ...order,
          items: items.rows,
          customer: customer.rows[0],
          tailoring: tailoring.rows[0]
            ? {
                ...tailoring.rows[0],
                measurements: JSON.parse(
                  tailoring.rows[0].measurements || "{}",
                ),
              }
            : null,
        };
      }),
    );

    res.json(data);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE ORDER
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM order_items WHERE order_id = $1", [id]);
    await pool.query("DELETE FROM tailoring WHERE order_id = $1", [id]);
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE STATUS
app.put("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
      status,
      req.params.id,
    ]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE PRODUCT
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, pricePerMeter, category, description } = req.body;

    const result = await pool.query(
      `UPDATE products 
       SET name=$1, sku=$2, pricePerMeter=$3, category=$4, description=$5
       WHERE id=$6`,
      [name, sku, pricePerMeter, category, description, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE TAILORING STATUS
app.put("/api/tailoring/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
      status,
      orderId,
    ]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 TEST
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= START =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} 🚀`);
  await initDB();
});
