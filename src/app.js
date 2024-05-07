import express from 'express'

const app = express();
app.use(express.json())

const livros = [
    {
        id: 1,
        titulo: "Harry Potter"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
]

function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id)
    })
}

function filtraLivro(id) {
    return livros.filter(livro => livro.id === Number(id))
}

app.get('/', (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros)
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

export default app;