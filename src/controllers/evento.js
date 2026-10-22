const con = require('./db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    try {
        const query = 'INSERT INTO eventos (cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId) VALUES (?, ?, ?, ?, ?, ?);'
        con.query(query, [cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId], (err, results) => {
            if(err) {
                console.error(err)
                res.status(500).json({error: 'Erro ao cadastrar evento'})
            }else{
                res.status(201).json({ message: 'Evento cadastrado com sucesso', results})
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto{}, usuarioId}' })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM eventos;'
    con.query(query, (err, results) =>{
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos' })
        }else{
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId} = req.body
    try {
        const query = 'UPDATE usuarios SET cidade=?, tipoEvento=?, temperaturaMaxima=?, data=?, nivelImpacto=?, usuarioId=? WHERE id = ?'
        con.query(query, [cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId, Number(req.params.id)], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao alterar evento'})
            }else{
                res.status(202).json({ message: 'Evento alterado com sucesso', results })
            }
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao alterar evento', details: 'Informe { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId} '})
    }
}

const excluir = (req, res) => {
    const id = Number(req.params.id)

    const query = 'DELETE FROM eventos WHERE id = ?;'
    try{
        con.query(query, [id], (err, results) =>{
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao excluir evento'})
            }else if (results.affectedRows === 0){
                res.status(404).json({ error: 'Evento não encontrado '})
            } else {
                res.json({ message: 'Evento excluído com sucesso' })
            }
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao excluir evento', details: 'Informe id como parâmetro'})
    }
}

module.exports = {
    listar,
    alterar,
    excluir,
    cadastrar
}