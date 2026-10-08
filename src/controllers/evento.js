const con = require('./db')

const cadastrar = (req, res) => {
    const { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId} = req.body
    try {
        const query = 'INSERT INTO eventos (cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId) VALUES (?, ?, ?, ?, ?, ?)'
        con.query(query, [cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento'})
            }else{
                res.status(201).json({ message: 'Evento cadastrado com sucesso', results })
            }
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId} '})
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
module.exports = {
    listar,
    cadastrar
}