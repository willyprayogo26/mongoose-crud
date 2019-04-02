const { isLogin } = require('./authenticate')
const { isAuthorizedAdmin, isAuthorizedUser } = require('./authorize')

module.exports = { isLogin, isAuthorizedAdmin, isAuthorizedUser }