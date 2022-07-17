const express = require('express')
const mongoose = require('mongoose')

const Animal = mongoose.model('Animal', new mongoose.Schema({
    tipo: String,
    estado: String,
}))
  
const app = express()

mongoose.connect('mongodb://gary:mongo123@localhost:27017/miapp?authSource=admin')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err))

app.get('/', (_req, res) => {
    console.log('listando...')
    async function listar() {
        const animales = await Animal.find()
        res.send(animales)       
    }
    listar()
})

app.get('/crear', (_req, res) => {
    console.log('creando...')
    async function crear() {
        await Animal.create({tipo: 'Perro', estado: 'Adoptado'})
        res.send('Animal creado')
    }
    crear()
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
