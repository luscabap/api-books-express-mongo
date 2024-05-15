import express from "express";
import db from "../config/dbConnect.js";
import routes from "./index.js";
import manipuladorDeErros from "../middlewares/manipuladoDeErros.js";
import manipulador404 from "../middlewares/manipulador404.js";

db.on("error", (erro) => {
  console.log.bind(console, `erro de conexão - ${erro}`);
});

db.once("open", () => {
  console.error("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
