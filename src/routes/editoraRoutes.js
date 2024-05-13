import express from "express";
import EditoraController from "../controller/editoraController.js";

const routes = express.Router();

routes.get("/editoras", EditoraController.obterEditora);
routes.get("/editoras/:idEditora", EditoraController.obterEditoraPorId);
routes.post("/editoras", EditoraController.criarEditora);
routes.put("/editoras/:idEditoraASerAtualizada", EditoraController.atualizarEditora);
routes.delete("/editoras/:idEditoraASerExcluida", EditoraController.excluirEditora);

export default routes;