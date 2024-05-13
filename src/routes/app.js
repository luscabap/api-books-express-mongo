import express from "express";
import db from "../config/dbConnect.js";
import routes from "./index.js";
import mongoose from "mongoose";

db.on("error", (erro) => {
  console.log.bind(console, `erro de conexão - ${erro}`);
});

db.once("open", () => {
  console.error("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

routes(app);

// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError){
    res.status(400).send({ message: "ID inválido. Por favor, verifique e tente novamente!" });
  } else {
    res.status(500).send({ message: "Erro interno de servidor" });
  }
});

export default app;
