const con = require('./db')

const cadastrar = (req, res) => {
    const { nome, email, senha} = req.body
    try {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(query, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário'})
            }else{
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', results })
            }
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha} '})
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM usuarios;'
    con.query(query, (err, results) =>{
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        }else{
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { nome, email, senha} = req.body
    try {
        const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = password(?) WHERE id = ?'
        con.query(query, [nome, email, senha, Number(req.params.id)], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao alterar usuário'})
            }else{
                res.status(202).json({ message: 'Usuário alterado com sucesso', results })
            }
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao alterar usuário', details: 'Informe { nome, email, senha} '})
    }
}

module.exports = {
    listar,
    alterar,
    cadastrar
}