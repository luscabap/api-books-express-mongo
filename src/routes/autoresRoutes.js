import express from 'express';
import AutorController from '../controller/autorController.js';

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/:idAutor", AutorController.listarAutorEspecifico);
routes.post("/autores", AutorController.criarAutor);
routes.put("/autores/:idAutorASerEditado", AutorController.editarAutor);
routes.delete("/autores/:idAutorASerExcluido", AutorController.excluirAutor);

export default routes;