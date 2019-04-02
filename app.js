require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const routes = require('./routes')

mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})