import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";
import { editoraSchema } from "./Editora.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, "O campo titulo do livro é obrigatório! Por favor, verifique novamente."]
  },
  editora: editoraSchema,
  preco: {
    type: Number,
    required: [true, "O campo preco do livro é obrigatório. Por favor, verifique novamente."]
  },
  paginas: {
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"]
  },
  autor: autorSchema
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;