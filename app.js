const express = require("express");
const mysql = require("mysql");
const DATABASE = require("./db_config");

const app = express();
const con = mysql.createConnection(DATABASE);

let database_up = false;

con.connect((err) => {
  if (err) {
    console.error("Error: " + err.message);
  } else {
    database_up = true;
  }
});

app.get("/api/v1/query/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let response_content;

  if (!Number.isInteger(id) || id < 0) {
    res.status(400).send({ error: "Id must be positive integer" });
  }

  if (database_up) {
    const sql = "SELECT value FROM `values` WHERE id=?";
    con.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(200);
        response_content = { id: req.params.id, value: result[0].value };
      } else {
        res.status(404);
        response_content = {};
      }
      res.send(response_content);
    });
  } else {
    res.status(500).send({ error: "Database error" });
  }
});

app.use(express.json());
app.use((err, req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    res.status(400).send({ error: "json error" });
  }
});

app.post("/api/v1/store", (req, res) => {
  const data = req.body;
  if (data.id === undefined || data.value === undefined) {
    res.status(400).send({ error: "id and value attributes are required" });
  } else if (!Number.isInteger(parseInt(data.id)) || data.id < 0) {
    res.status(400).send({ error: "id must be a positive integer" });
  } else if (data.value.length > 100) {
    res.status(400).send({ error: "max value length is 100" });
  } else if (!database_up) {
    res.status(500).send({ error: "Database error" });
  } else {
    con.query(
      "SELECT value FROM `values` WHERE id=?",
      [data.id],
      (err, result) => {
        if (err) {
          res.status(500).send({ error: "Database error: " + err.message });
        } else if (result.length > 0) {
          res.status(409).send({ error: "id already exists" });
        } else {
          const sql = "INSERT INTO `values`(id, value) VALUES (?, ?)";
          con.query(sql, [data.id, data.value], (err, result) => {
            if (err) {
              res
                .status(500)
                .send({ error: "Error storing data: " + err.message });
            } else {
              res
                .status(200) // For the exercise is 200, but it should be 201 CREATED
                .send({ result: { id: data.id, value: data.value } });
            }
          });
        }
      }
    );
  }
});

app.listen(3000, () => console.log("Listening bro"));
