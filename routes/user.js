const express = require("express")
const router = express.Router()

//require modules
const { signup, signin, addRole } = require("../controllers/user")
const { signupVal, signinVal } = require("../validations/user")
const expressValidator = require("../middlewares/expressValidator")


router.post("/signup", signupVal, expressValidator, signup)
router.post("/signin", signinVal, expressValidator, signin)
router.get("/role", addRole)


module.exports = router