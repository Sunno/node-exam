const mysql = require("mysql");
const DATABASE = require("./db_config");

const con = mysql.createConnection(DATABASE);

con.connect((err) => {
  if (err) {
    console.error("Error: " + err.message);
  } else {
    let sql =
      "CREATE TABLE " +
      DATABASE.database +
      ".`values` ( `id` INT UNSIGNED NOT NULL, `value` VARCHAR(100) NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;";
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Table created succesfully");
    });
  }
});
