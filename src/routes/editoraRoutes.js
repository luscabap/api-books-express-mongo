import express from 'express';
import EditoraController from '../controller/editoraController.js';

const routes = express.Router();

routes.get('/editoras', EditoraController.obterEditora);

export default routes;