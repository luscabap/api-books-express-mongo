import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";
import editora from "./editoraRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    try {
      res.status(200).send("Curso de Node.JS");
    } catch (error) {
      res.status(500).send(`Erro - ${error}`);
    }
  });

  app.use(express.json(), livros, autores, editora);
};

export default routes;
