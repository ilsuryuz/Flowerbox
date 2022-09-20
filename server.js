const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose')
const Flower = require('./models/data')

// ** Databse Connection **
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ** Seed **
const dataSeed = require('./models/seed')
app.get('/seed', (req, res) => {
    Flower.deleteMany({}, (error, allFlowers) => {})
    Flower.create(dataSeed, (error, data) => {
        res.redirect('/')
    })
})
app.get('/', (req, res) => {
    Flower.find({}, (errpr, allFlowers) => {
        res.render('index.ejs', {
            flowers: allFlowers,
        })
    })
})


app.listen(3000, () => {
    console.log('pizza')
})