import express from 'express';
import conectaNaDataBase from '../config/dbConnect.js';
import routes from './index.js';

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.log.bind(console, `erro de conexão - ${erro}`);
})

conexao.once("open", () => {
    console.error("Conexão com o banco feita com sucesso");
})

const app = express();
routes(app);

export default app;