const db = require("../config/db");

exports.getAnalytics = (req, res) => {
  db.get(`SELECT COUNT(*) as count FROM jobs`, (err, row) => {
    res.json({
      users: row.count,
      orders: row.count,
    });
  });
};
