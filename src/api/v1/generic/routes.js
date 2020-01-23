const express = require('express')
let router = express.Router()

const todoController = require('./controller')

router.get('/', todoController.getUsers)
router.get('/:id', todoController.getUserById)
router.post('/', todoController.createUser)
router.put('/:id', todoController.updateUser)
router.delete('/:id', todoController.deleteUser)

module.exports = router