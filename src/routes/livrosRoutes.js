import express from "express";
import LivroController from "../controller/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.listarLivroGenerico, paginar);
routes.get("/livros/editoras", LivroController.listarLivroPorEditora);
routes.get("/livros/autores", LivroController.listarLivroPorAutor);
routes.get("/livros/:idLivro", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:idLivro", LivroController.atualizarLivro);
routes.delete("/livros/:idLivro", LivroController.excluirLivro);

export default routes;