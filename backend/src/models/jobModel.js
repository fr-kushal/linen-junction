const db = require("../config/db");

exports.createJob = (job) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO jobs (id, customerName, productName, status, tailor)
       VALUES (?, ?, ?, ?, ?)`,
      [job.id, job.customerName, job.productName, job.status, job.tailor],
      function (err) {
        if (err) reject(err);
        else resolve();
      },
    );
  });
};

exports.updateJob = (id, status, tailor) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE jobs 
SET status = ?, tailor = ?, priority = ?, updatedAt = CURRENT_TIMESTAMP 
WHERE id = ?`,
      [status, tailor, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      },
    );
  });
};

exports.getJobs = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM jobs ORDER BY createdAt DESC`, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
