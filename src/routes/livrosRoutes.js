import express from "express";
import LivroController from "../controller/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca", LivroController.listarLivroPorEditora);
routes.get("/livros/teste", LivroController.listarLivroPorAutor);
routes.get("/livros/:idLivro", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:idLivro", LivroController.atualizarLivro);
routes.delete("/livros/:idLivro", LivroController.excluirLivro);

export default routes;