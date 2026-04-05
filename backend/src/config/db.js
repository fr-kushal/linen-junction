const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  customerName TEXT,
  productName TEXT,
  status TEXT,
  tailor TEXT,
  priority TEXT DEFAULT 'medium',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
