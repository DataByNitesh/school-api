import mysql from "mysql2";

const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("DB Connected");
  }
});
