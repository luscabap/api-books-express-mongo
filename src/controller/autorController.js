import { autor } from "../models/Autor.js";

class AutorController {
    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ message: `${erro} - Erro ao fazer a requisição` });
        }
    }

    static async listarAutorEspecifico(req, res) {
        try {
            const id = req.params.idAutor;
            const autorFiltrado = await autor.findById(id);
            res.status(200).json(autorFiltrado);
        } catch (error) {
            console.error(error)
        }
    }

    static async criarAutor(req, res) {
        try {
            const infosAutor = req.body;
            const autorCriado = await autor.create(infosAutor)
            res.status(201).json({ message: "Autor criado com sucesso!", autor: autorCriado });
        } catch (error) {
            console.error("Erro", error)
            res.status(500).json({ message: "Erro ao criar o autor :C" })
        }
    }

    static async editarAutor(req, res) {
        try {
            const id = req.params.idAutorASerEditado;
            const informacoesNovas = req.body;
            await autor.findByIdAndUpdate(id, informacoesNovas);
            res.status(201).json({ message: "Autor(a) alterado com sucesso!" })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: `Erro ao criar o autor ${error}`, erro: error })
        }
    }

    static async excluirAutor(req, res) {
        try {
            const id = req.params.idAutorASerExcluido;
            await autor.findByIdAndRemove(id);
            res.status(200).json({ message: `O Autor com id ${id} excluído com sucesso!` });
        } catch (error) {
            res.send(500).json({ message: "Erro ao excluir o autor :C" });
            console.error(`Erro ${error}`);
        }
    }
};

export default AutorController;