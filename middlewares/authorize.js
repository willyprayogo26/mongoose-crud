module.exports = {
    isAuthorizedAdmin: (req, res, next) => {
        try {
            if(req.member.role === 'admin') {
                next()
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                })
            }
        } catch(err) {
            res.status(400).json({
                message: 'Bad request'
            })
        }
    },

    isAuthorizedUser: (req, res, next) => {
        try {
            if(req.member.id.toString() === req.params.id || req.member.role === 'admin') {
                next()
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                })
            }
        } catch (err) {

        }
    }
}