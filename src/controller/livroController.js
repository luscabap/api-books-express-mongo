import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

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
    
    static async cadastrarLivro(req, res){
        const novoLivro = req.body;

        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            console.log(livroCompleto);
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