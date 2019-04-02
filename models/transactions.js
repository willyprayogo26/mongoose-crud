const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    in_date: Date,
    out_date: Date,
    due_date: Date,
    fine: Number,
    booklist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
})

transactionSchema.pre('save', (next) => {
    this.out_date = new Date()
    next()
})

transactionSchema.post('findOneAndUpdate', (transaction, next) => {
    if (transaction.in_date > transaction.due_date) {
        transaction.fine = Math.round(Math.abs(transaction.in_date.getTime() - transaction.due_date.getTime()) / (24 * 60 * 60 * 1000)) * 1000
    }
    transaction.save()
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction