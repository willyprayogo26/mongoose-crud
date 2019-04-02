const { Transaction, Book } = require('../models')

class transactionController {
    static getAllTransaction (req, res) {
        let where = {}
        if(req.query && req.query.value) {
            where = {
                booklist: (require('mongoose')
                .Schema
                .Types
                .ObjectId(req.query.value))
            }
        }
        Transaction.find(where)
        .populate('member')
        .populate('booklist')
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTransactionById (req, res) {
        Transaction.findOne({
            _id: req.params.id
        })
        .then(transaction => {
            if(transaction) {
                res.status(200).json(transaction)
            } else {
                res.status(404).json({
                    message: 'Transaction not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createTransaction (req, res) {
        Book.find({
            _id: req.body.booklist,
        })
        .where('stock').gt(0)
        .then(books => {
            if(books.length === req.body.booklist.length) {
                return Book.update({
                    _id: { $in: req.body.booklist }
                }, {
                    $inc: {'stock': -1}
                }, {
                    new: true,
                    multi: true
                })
            } else {
                res.status(404).json({
                    message: 'Transaction failed'
                })
            }
        })
        .then(update => {
            if(update.ok === 1) {
               return Transaction.create({
                    member: req.member.id,
                    out_date: new Date,
                    ...req.body
                }) 
            } else {
                res.status(404).json({
                    message: 'Transaction failed'
                })
            }
        })
        .then(member => {
            res.status(201).json(member)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateTransaction (req, res) {
        Transaction.findOneAndUpdate({
            _id: req.params.id
        }, {
            ...req.body
        }, {
            new: true
        })
        .then(transaction => {
            if(transaction) {
                res.status(200).json(transaction)
            } else {
                res.status(404).json({
                    message: 'Transaction not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTransaction (req, res) {
        Transaction.findOneAndDelete({
            _id: req.params.id
        })
        .then(transaction => {
            if(transaction) {
                res.status(200).json({
                    message: 'Transaction successfully deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Transaction not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = transactionController