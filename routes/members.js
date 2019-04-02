const router = require('express').Router()
const { memberController } = require('../controllers')
const { isAuthorizedAdmin, isAuthorizedUser } = require('../middlewares')

router.get('/:id', isAuthorizedUser, memberController.getMemberById)
router.put('/:id', isAuthorizedUser, memberController.updateMember)

router.use(isAuthorizedAdmin)
router.get('/', memberController.getAllMember)
router.post('/', memberController.createMember)
router.delete('/:id', memberController.deleteMember)

module.exports = router