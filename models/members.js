const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { bcrypt } = require('../helpers')

const memberSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Please input your name']
    },
    address: {
        type: String,
        required: [true, 'Please input your address']
    },
    zipcode: {
        type: String,
        required: [true, 'Please input your zip code']
    },
    email: {
        type: String,
        validate: [
            {
                validator: function(v) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
                },
                message: 'Invalid Email'
            },
            {
                validator: function(v) {
                    return mongoose.model('Members', memberSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: v
                    })
                    .then(data => {
                        if(data.length !== 0) {
                            return false
                        }
                    })
                    .catch(err => {
                        return err.message
                    })
                },
                message: 'Email has been used'
            }
        ]
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(v)
            },
            message: 'Password must contain at least one letter, one number, and minimum six characters'
        }
    },
    phone: {
        type: String,
        required: [true, 'Please input your phone'],
        minlength: [11, 'Phone characters must be between 11 - 13'],
        maxlength: [13, 'Phone characters must be between 11 - 13'],
    },
    role: {
        type: String
    }
}, {
    timestamps: {}
})

memberSchema.pre('save', function(next) {
    this.email = this.email.toLowerCase()
    this.password = bcrypt.hashPassword(this.password)
    next()
})

memberSchema.pre('findOneAndUpdate', function(next) {
    this._update.email = this._update.email.toLowerCase()
    this._update.password = bcrypt.hashPassword(this._update.password)
    next()
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member