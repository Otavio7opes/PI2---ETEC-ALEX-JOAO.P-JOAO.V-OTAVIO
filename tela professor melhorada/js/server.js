// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Rota para listar kits
app.get("/kits", (req, res) => {
  connection.query("SELECT * FROM kits", (err, results) => {
    if (err) {
      res.status(500).send("Erro ao buscar kits");
    } else {
      res.json(results);
    }
  });
});

// Rota para criar kit
app.post("/kits", (req, res) => {
  const { nome, descricao, materiais } = req.body;
  const sql = "INSERT INTO kits (nome, descricao, materiais) VALUES (?, ?, ?)";
  connection.query(sql, [nome, descricao, materiais], (err, result) => {
    if (err) {
      res.status(500).send("Erro ao salvar kit");
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
