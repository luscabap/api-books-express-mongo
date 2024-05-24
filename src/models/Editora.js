import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: {
    type: String,
    required: [true, "O nome da editora é obrigatório"],
    enum: {
      values: ["Saraiva", "Kalunga", "Teste"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  porte: { type: String }
}, { versionKey: false });

const editora = mongoose.model("editoras", editoraSchema);

export { editora, editoraSchema };