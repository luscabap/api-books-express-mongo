import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import { editora } from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

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
      if (livroFiltrado !== null) {
        res.status(200).json(livroFiltrado);
      } else {
        next(new NaoEncontrado("O ID do livro não foi encontrado", 404));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorEditora(req, res, next){
    try {
      const { editora } = req.query;

      const livrosPorEditora = await livro.find({
        "editora.nome": editora
      });
      if (livrosPorEditora.length > 0) {
        res.status(200).json(livrosPorEditora);
      } else {
        next(new NaoEncontrado("A Editora não foi encontrada, verifique e tente novamente", 404));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroGenerico(req, res, next) {
    try {
      const { titulo, preco } = req.query;

      const busca = {};
      if (titulo) busca.titulo = titulo;
      if (preco) busca.preco = preco;

      const livrosFiltrados = await livro.find(busca);
      if (livrosFiltrados.length > 0) {
        res.status(200).json(livrosFiltrados);
      } else {
        next(new NaoEncontrado("O campo fornecido não foi encontrado, verifique e tente novamente", 404));
      }
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
      } else {
        next(new NaoEncontrado("O Autor não foi encontrado, verifique e tente novamente", 404));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next){
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const editoraEncontrada = await editora.findById(novoLivro.editora);
      if (autorEncontrado === null) {
        next(new NaoEncontrado("O ID do Autor não foi localizado", 404));
      } else if (editoraEncontrada === null){
        next(new NaoEncontrado("O ID da Editora não foi localizado", 404));
      } else if (editoraEncontrada && autorEncontrado !== null){
        const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }, editora: { ...editoraEncontrada._doc } };
        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado});
      } else {
        next(new NaoEncontrado("O ID não foi encontrado", 404));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.idLivro;
      const novasInformacoes = req.body;

      const livroAtualizado = await livro.findByIdAndUpdate(id, novasInformacoes);
      if (livroAtualizado !== null){
        res.status(200).json({ message: "Livro alterado com sucesso!"});
      } else {
        next(new NaoEncontrado("ID do livro não encontrado, verifique e tente novamente!", 404));
      }
    } catch (error) {
      next(error);
    }

  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.idLivro;
      const livroASerExcluido = await livro.findByIdAndDelete(id);
      if (livroASerExcluido !== null){
        res.status(200).json({ message: "Livro excluído com sucesso!" });
      } else {
        next(new NaoEncontrado("O ID do livro não foi encontrado, verifique e tente novamente, por favor.", 404));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;