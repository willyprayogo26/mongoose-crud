const { jwt } = require('../helpers')
const { Member } = require('../models')

module.exports = {
    isLogin: (req, res, next) => {
        let payload = jwt.jwtVerify(req.headers.token)
        
        if(payload) {
            Member.findById(payload.id)
            .then(member => {
                if(member) {
                    req.member = {
                        id: member._id,
                        name: member.name,
                        email: member.email,
                        role: member.role,
                        token: req.headers.token,
                    }
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
            })
            .catch(err => {
                res.send(500).json({
                    message: err.message
                })
            })
        } else {
            res.send(401).json({
                message: 'Please provide a valid token'
            })
        }
    }
}