import express from 'express';
import conectaNaDataBase from './config/dbConnect.js';
import livro from './models/Livro.js';

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

conexao.once("open", () => {
    console.error("Conexão com o banco feita com sucesso");
})

const app = express();
app.use(express.json())

function filtraLivro(id) {
    return livros.filter(livro => livro.id === Number(id))
}

function excluiLivro(id){
    const novaLista = livros.filter(livro => livro.id !== Number(id));
    console.log(novaLista);
    return novaLista
}

app.get('/', (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get('/livros', async (req, res) => {
    const listaLivros = await livro.find({})
    res.status(200).json(listaLivros)
});

app.get('/livros/:id', (req, res) => {
    // const index = buscaLivro(req.params.id)
    // res.status(200).send(livros[index])

    const livroFiltrado = filtraLivro(req.params.id)
    if (livroFiltrado.length === 0) {
        return res.status(404).send("Livro não encontrado :(")
    }
    res.status(200).send(livroFiltrado)
})

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro adicionado com sucesso!");
})

app.put("/livros/:idLivroASerAlterado", (req, res) => {
    const livroFiltrado = filtraLivro(req.params.idLivroASerAlterado);
    if (livroFiltrado.length === 0) {
        res.status(404).send("Livro não encontrado. Por favor, verifique novamente.")
    }
    livroFiltrado.map(item => item.titulo = req.body.titulo );
    res.status(200).json(livros);

    // const index = buscaLivro(req.params.idLivroASerAlterado)
    // livros[index].titulo = req.body.titulo;
    // res.status(200).json(livros)
})

app.delete("/livros/:idLivroASerExcluido", (req, res) => {
    excluiLivro(req.params.idLivroASerExcluido)
    res.status(200).send("Livro excluído com sucesso");
})

export default app;