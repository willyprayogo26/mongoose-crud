const router = require('express').Router()
const { transactionController } = require('../controllers')
const { isAuthorizedAdmin } = require('../middlewares')

router.use(isAuthorizedAdmin)
router.get('/', transactionController.getAllTransaction)
router.get('/:id', transactionController.getTransactionById)
router.post('/', transactionController.createTransaction)
router.put('/:id', transactionController.updateTransaction)
router.delete('/:id', transactionController.deleteTransaction)

module.exports = router