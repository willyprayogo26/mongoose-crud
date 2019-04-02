const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema ({
    isbn: {
        type: String,
        unique: [true, 'Plase provide a unique isbn'],
        required: [true, 'Please input isbn']
    },
    title: {
        type: String,
        required: [true, 'Please input title']
    },
    author: {
        type: String,
        required: [true, `Please input book's author`]
    },
    category: {
        type: String,
        required: [true, `Please input book's category`]
    },
    stock: {
        type: Number,
        required: [true, 'Please input stock of books'],
        min: [1, 'Minimum stock is 1']
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book