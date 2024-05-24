import mongoose from "mongoose";
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
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
    }
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor é obrigatório(a)"]
  }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;