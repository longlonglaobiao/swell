const mysql = require("mysql");

const mysqlClient = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "root",
  database: "swell",
});

mysqlClient.connect();

const execSQL = (sql) => {
  console.log("sql=", sql);
  return new Promise((resolve, reject) => {
    mysqlClient.query(sql, (err, rows) => {
      if (err) return reject(err);
      else resolve(rows);
    });
  });
};

const execTransaction = (sqls) => {
  return new Promise((resolve, reject) => {
    mysqlClient.beginTransaction((err) => {
      if (err) return reject(err);
      else {
        sqls.forEach((sql) => {
          mysqlClient.query(sql, (err, rows) => {
            if (err) {
              return mysqlClient.rollback(() => {
                console.log(err);
              });
            } else {
              mysqlClient.commit((err) => {
                if (err) {
                  console.log(err);
                  return;
                }
                return resolve(rows);
              });
            }
          });
        });
      }
    });
  });
};

module.exports = { execSQL, execTransaction };
