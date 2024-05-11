import { editora } from "../models/Editora.js";

class EditoraController{
    static async obterEditora(req, res){
        try {
            const editorasEncontradas = await editora.find({})
            res.status(200).json(editorasEncontradas)
        } catch (error) {
            res.status(500).json({ message: "Erro ao fazer a requisição" })
        }
    }
}

export default EditoraController;