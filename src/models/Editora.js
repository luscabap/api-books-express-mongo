import mongoose from "mongoose";

const EditoraSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    porte: { type: String }
})

const editora = mongoose.model("editoras", EditoraSchema);

export { editora, EditoraSchema };