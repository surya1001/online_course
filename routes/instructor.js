const express = require("express")
const { becomeInstructor, updateInstructor } = require("../controllers/instructor")
const { verifyToken } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const { instructorVal, updateInstructorVal } = require("../validations/instructor")
const router = express.Router()

router.post("/", instructorVal, expressValidator, verifyToken, becomeInstructor)
router.put("/", updateInstructorVal, expressValidator, verifyToken, updateInstructor)

module.exports = router