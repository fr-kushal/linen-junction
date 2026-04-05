const db = require("../config/db");

exports.createLog = (message) => {
  db.run(`INSERT INTO logs (message) VALUES (?)`, [message]);
};
