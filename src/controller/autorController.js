import NaoEncontrado from "../errors/NaoEncontrado.js";
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
        next(new NaoEncontrado("ID do autor não localizado", 404));
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
      const autorFiltrado = await autor.findByIdAndUpdate(id, informacoesNovas);
      if (autorFiltrado !== null) {
        res.status(201).json({ message: "Autor(a) alterado com sucesso!" });
      } else {
        next(new NaoEncontrado("O ID não foi encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.idAutorASerExcluido;
      const autorFiltrado = await autor.findByIdAndRemove(id);
      if (autorFiltrado !== null) {
        res
          .status(200)
          .json({ message: `O Autor com id ${id} excluído com sucesso!` });
      } else {
        next(new NaoEncontrado("ID Não encontrado", 404));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;
