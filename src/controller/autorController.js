import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      next(error);
    }
  }

  static async listarAutorEspecifico(req, res, next) {
    try {
      const id = req.params.idAutor;
      const autorFiltrado = await autor.findById(id);
      if (autorFiltrado !== null) {
        res.status(200).json(autorFiltrado);
      } else {
        res.status(404).send({ message: "ID do autor não localizado" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async criarAutor(req, res, next) {
    try {
      const infosAutor = req.body;
      const autorCriado = await autor.create(infosAutor);
      res
        .status(201)
        .json({ message: "Autor criado com sucesso!", autor: autorCriado });
    } catch (error) {
      next(error);
    }
  }

  static async editarAutor(req, res, next) {
    try {
      const id = req.params.idAutorASerEditado;
      const informacoesNovas = req.body;
      await autor.findByIdAndUpdate(id, informacoesNovas);
      res.status(201).json({ message: "Autor(a) alterado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.idAutorASerExcluido;
      await autor.findByIdAndRemove(id);
      res
        .status(200)
        .json({ message: `O Autor com id ${id} excluído com sucesso!` });
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;
