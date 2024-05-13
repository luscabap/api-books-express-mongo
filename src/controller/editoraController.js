import { editora } from "../models/Editora.js";

class EditoraController {
    static async obterEditora(req, res) {
        try {
            const editorasEncontradas = await editora.find({});
            res.status(200).json(editorasEncontradas);
        } catch (error) {
            res.status(500).json({ message: "Erro ao fazer a requisição" });
            console.error(`Erro ${error}`);
        }
    };

    static async obterEditoraPorId(req, res) {
        try {
            const id = req.params.idEditora;
            const editoraFiltrada = await editora.findById(id);
            res.status(200).json({ message: "Editora encontrada com sucesso!", editora: editoraFiltrada })
        } catch (error) {
            res.status(500).json({ message: `Erro ao encontrar a editora, tente novamente. - ${error}` })
        }
    };

    static async criarEditora(req, res) {
        try {
            const informacoesEditora = req.body;
            await editora.create(informacoesEditora);
            res.status(201).json({ message: "Editora criada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `Erro ao criar a editora ${error}` })
        }
    };

    static async atualizarEditora(req, res) {
        try {
            const id = req.params.idEditoraASerAtualizada;
            const informacoesASeremAtualizadas = req.body;
            await editora.findByIdAndUpdate(id, informacoesASeremAtualizadas);
            res.status(200).json({ message: `Editra com ID ${id} atualizada com sucesso` })
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar editora :C - Erro: ${error}` })
        }
    }

    static async excluirEditora(req, res) {
        try {
            const id = req.params.idEditoraASerExcluida;
            await editora.findByIdAndRemove(id)
            res.status(200).json({ message: `Editora com ID ${id} excluida com sucesso!` });
        } catch (error) {
            res.status(500).json({ message: `Erro ao excluir a editora :C - Erro ${error}` })
        }
    }
}

export default EditoraController;