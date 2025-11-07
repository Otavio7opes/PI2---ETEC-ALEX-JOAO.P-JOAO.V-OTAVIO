// db.js
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost:3306",
  user: "root",
  password: "imtdb", 
  database: "laboratorio"
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
  }
});

export default connection;
