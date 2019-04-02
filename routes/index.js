const router = require('express').Router()
const books = require('./books')
const members = require('./members')
const transactions = require('./transactions')
const { isLogin } = require('../middlewares')
const { memberController } = require('../controllers')

router.post('/registerAdmin', memberController.registerAdmin)
router.post('/register', memberController.register)
router.post('/login', memberController.login)

router.use(isLogin)
router.use('/books', books)
router.use('/members', members)
router.use('/transactions', transactions)

module.exports = router