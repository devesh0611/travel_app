const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { editProfile, changePassword } = require('../controllers/accountController')

router.post('/edit', auth, editProfile)
router.post('/change', auth, changePassword)

module.exports = router