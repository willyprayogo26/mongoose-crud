const { Book } = require('../models')

class bookController {
    static getAllBook (req, res) {
        let where = {}
        if(req.query) {
            let key = Object.keys(req.query)
            let temp= []
            key.forEach(e => {
                temp.push({ [e]: { $regex: new RegExp(req.query[e], 'i') } })
            })
            if(temp.length > 0) {
                where = {
                    $or: temp
                }
            }
        }
        Book.find(where)
        .then(books => {
            res.status(200).json(books)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getBookById (req, res) {
        Book.findOne({
            _id: req.params.id
        })
        .then(book => {
            if(book) {
                res.status(200).json(book)
            } else {
                res.status(404).json({
                    message: 'Book not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createBook (req, res) {
        Book.create({
            ...req.body
        })
        .then(book => {
            res.status(201).json(book)
        })
        .catch(err => {
            if(err.errors.isbn) {
                res.status(400).json({
                    message: err.errors.isbn.message
                })
            } else if(err.errors.title) {
                res.status(400).json({
                    message: err.errors.title.message
                })
            } else if(err.errors.author) {
                res.status(400).json({
                    message: err.errors.author.message
                })
            } else if(err.errors.category) {
                res.status(400).json({
                    message: err.errors.category.message
                })
            } else if(err.errors.stock) {
                res.status(400).json({
                    message: err.errors.stock.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static updateBook (req, res) {
        Book.findOneAndUpdate({
            _id: req.params.id
        }, {
            ...req.body
        }, {
            new: true
        })
        .then(book => {
            if(book) {
                res.status(200).json(book)
            } else {
                res.status(404).json({
                    message: 'Book not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteBook (req, res) {
        Book.findOneAndDelete({
            _id: req.params.id
        })
        .then(book => {
            if(book) {
                res.status(200).json({
                    message: 'Book successfully deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Book not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = bookController