import { editora } from "../models/index.js";

class EditoraController {
  static async obterEditora(req, res, next) {
    try {
      const editorasEncontradas = await editora.find({});
      res.status(200).json(editorasEncontradas);
    } catch (error) {
      next(error);
    }
  }

  static async obterEditoraPorId(req, res, next) {
    try {
      const id = req.params.idEditora;
      const editoraFiltrada = await editora.findById(id);
      res.status(200).json({
        message: "Editora encontrada com sucesso!",
        editora: editoraFiltrada,
      });
    } catch (error) {
      next(error);
    }
  }

  static async criarEditora(req, res, next) {
    try {
      const informacoesEditora = req.body;
      await editora.create(informacoesEditora);
      res.status(201).json({ message: "Editora criada com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarEditora(req, res, next) {
    try {
      const id = req.params.idEditoraASerAtualizada;
      const informacoesASeremAtualizadas = req.body;
      await editora.findByIdAndUpdate(id, informacoesASeremAtualizadas);
      res
        .status(200)
        .json({ message: `Editra com ID ${id} atualizada com sucesso` });
    } catch (error) {
      next(error);
    }
  }

  static async excluirEditora(req, res, next) {
    try {
      const id = req.params.idEditoraASerExcluida;
      await editora.findByIdAndRemove(id);
      res
        .status(200)
        .json({ message: `Editora com ID ${id} excluida com sucesso!` });
    } catch (error) {
      next(error);
    }
  }
}

export default EditoraController;
