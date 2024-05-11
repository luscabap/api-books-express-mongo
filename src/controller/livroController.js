import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import { editora } from '../models/Editora.js';

class LivroController {
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);       
        } catch (erro) {
            res.status(500).json({ message: `${erro} - Erro ao fazer a requisição` });
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.idLivro;
            const livroFiltrado = await livro.findById(id);
            res.status(200).json(livroFiltrado);
        } catch (error) {
            res.json({ message: `${error} - Erro ao encontrar o livro!`});
        }
    }
    
    static async listarLivroPorEditora(req, res){
        const editoraASerEncontrada = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ "editora.nome": editoraASerEncontrada });
            if (livrosPorEditora.length > 0) {
                res.status(200).json(livrosPorEditora)
            } else throw new Error
        } catch (erro) {
            res.status(500).json({ message: `${erro} - Falha na requisição do livro :C` });
        }
    }

    static async listarLivroPorAutor(req, res){
        const autorASerEncontrado = req.query.autor;
        try {
            const livrosPorAutor = await livro.find({ "autor.nome": autorASerEncontrado });
            if (livrosPorAutor.length > 0){
                res.status(200).json(livrosPorAutor)
            } else throw new Error
        } catch (error) {
            res.status(500).json({ message: `Erro: ${error}` })
        }
    }

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;

        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const editoraEncontrada = await editora.findById(novoLivro.editora);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }, editora: { ...editoraEncontrada._doc } };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar o livro :(` })
            console.error(erro)
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.idLivro;
            const novasInformacoes = req.body;

            await livro.findByIdAndUpdate(id, novasInformacoes);
            res.status(200).json({ message: "Livro alterado com sucesso!"});
        } catch (erro) {
            res.json({ message: `${erro} - Erro ao atualizar o livro!`});
        }
        
    }

    static async excluirLivro(req, res) {
        try {
            const id = req.params.idLivro;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro excluído com sucesso!" });
        } catch (error) {
            res.json({ message: `${error} - Erro ao excluir o livro!`});
        }
    }
};

export default LivroController;