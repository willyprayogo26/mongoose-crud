const router = require('express').Router()
const { bookController } = require('../controllers')
const { isAuthorizedAdmin } = require('../middlewares')

router.get('/', bookController.getAllBook)
router.get('/:id', bookController.getBookById)

router.use(isAuthorizedAdmin)
router.post('/', bookController.createBook)
router.put('/:id', bookController.updateBook)
router.delete('/:id', bookController.deleteBook)

module.exports = router