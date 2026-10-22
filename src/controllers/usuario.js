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

const excluir = (req, res) => {
    const id = Number(req.params.id)

    const query = 'DELETE FROM usuarios WHERE id = ?;'
    try{
        con.query(query, [id], (err, results) =>{
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao excluir usuário'})
            }else if (results.affectedRows === 0){
                res.status(404).json({ error: 'Usuário não encontrado '})
            } else {
                res.json({ message: 'Usuário excluído com sucesso' })
            }
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao excluir usuário', details: 'Informe id como parâmetro'})
    }
}

module.exports = {
    listar,
    alterar,
    excluir,
    cadastrar
}