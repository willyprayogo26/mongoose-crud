const { Member } = require('../models')
const { bcrypt, jwt } = require('../helpers')

class memberController {
    static registerAdmin (req, res) {
        Member.create({
            ...req.body,
            role: 'admin'
        })
        .then(member => {
            res.status(201).json(member)
        })
        .catch(err => {
            if(err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.message
                })
            } else if(err.errors.address) {
                res.status(400).json({
                    message: err.errors.address.message
                })
            } else if(err.errors.zipcode) {
                res.status(400).json({
                    message: err.errors.zipcode.message
                })
            } else if(err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            } else if(err.errors.password) {
                res.status(400).json({
                    message: err.errors.password.message
                })
            } else if(err.errors.phone) {
                res.status(400).json({
                    message: err.errors.phone.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static register (req, res) {
        Member.create({
            ...req.body,
            role: 'member'
        })
        .then(member => {
            res.status(201).json(member)
        })
        .catch(err => {
            if(err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.message
                })
            } else if(err.errors.address) {
                res.status(400).json({
                    message: err.errors.address.message
                })
            } else if(err.errors.zipcode) {
                res.status(400).json({
                    message: err.errors.zipcode.message
                })
            } else if(err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            } else if(err.errors.password) {
                res.status(400).json({
                    message: err.errors.password.message
                })
            } else if(err.errors.phone) {
                res.status(400).json({
                    message: err.errors.phone.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static login (req, res) {
        Member.findOne({
            email: req.body.email
        })
        .then(member => {
            if(member && bcrypt.comparePassword(req.body.password, member.password)) {
                let token = jwt.jwtSign({
                    id: member.id
                })
                res.status(200).json({
                    id: member.id,
                    email: member.email,
                    role: member.role,
                    token: token
                })
            } else {
                res.status(400).json({
                    message: 'Invalid email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getAllMember (req, res) {
        Member.find({})
        .then(members => {
            res.status(200).json(members)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getMemberById (req, res) {
        Member.findOne({
            _id: req.params.id
        })
        .then(member => {
            if(member) {
                res.status(200).json(member)
            } else {
                res.status(404).json({
                    message: 'Member not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createMember (req, res) {
        Member.create({
            ...req.body
        })
        .then(member => {
            res.status(201).json(member)
        })
        .catch(err => {
            if(err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.message
                })
            } else if(err.errors.address) {
                res.status(400).json({
                    message: err.errors.address.message
                })
            } else if(err.errors.zipcode) {
                res.status(400).json({
                    message: err.errors.zipcode.message
                })
            } else if(err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            } else if(err.errors.password) {
                res.status(400).json({
                    message: err.errors.password.message
                })
            } else if(err.errors.phone) {
                res.status(400).json({
                    message: err.errors.phone.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static updateMember (req, res) {
        Member.findOneAndUpdate({
            _id: req.params.id
        }, {
            ...req.body
        }, {
            new: true
        })
        .then(member => {
            if(member) {
                res.status(200).json(member)
            } else {
                res.status(404).json({
                    message: 'Member not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteMember (req, res) {
        Member.findOneAndDelete({
            _id: req.params.id
        })
        .then(member => {
            if(member) {
                res.status(200).json({
                    message: 'Member successfully deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Member not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = memberController