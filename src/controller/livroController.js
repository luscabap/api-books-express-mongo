import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import { editora } from "../models/Editora.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find()
        .populate("autor")
        .exec();

      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.idLivro;
      const livroFiltrado = await livro.findById(id);
      res.status(200).json(livroFiltrado);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorEditora(req, res, next){
    const editoraASerEncontrada = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ "editora.nome": editoraASerEncontrada });
      if (livrosPorEditora.length > 0) {
        res.status(200).json(livrosPorEditora);
      } else throw new Error;
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorAutor(req, res, next){
    const autorASerEncontrado = req.query.autor;
    try {
      const livrosPorAutor = await livro.find({ "autor.nome": autorASerEncontrado });
      if (livrosPorAutor.length > 0){
        res.status(200).json(livrosPorAutor);
      } else throw new Error;
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next){
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const editoraEncontrada = await editora.findById(novoLivro.editora);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }, editora: { ...editoraEncontrada._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado});
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.idLivro;
      const novasInformacoes = req.body;

      await livro.findByIdAndUpdate(id, novasInformacoes);
      res.status(200).json({ message: "Livro alterado com sucesso!"});
    } catch (error) {
      next(error);
    }

  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.idLivro;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;