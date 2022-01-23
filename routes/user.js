const express = require("express")
const router = express.Router()

//require modules
const { signup, signin, addRole } = require("../controllers/user")
const { signupVal, signinVal } = require("../validations/user")
const expressValidator = require("../middlewares/expressValidator")


router.post("/signup", signupVal, expressValidator, signup)
router.post("/signin", signinVal, expressValidator, signin)
router.get("/role", addRole)

/**
* @swagger
* /user/signin:    
*   post:
*     tags:
*       - User
*     summary: To signin user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*         required:
*           - email
*           - password
*     responses:
*       201:
*         description: User signedin
*       422:
*         description: Something went wrong
* 
*
* /user/signup:    
*   post:
*     tags:
*       - User
*     summary: To signup user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name: 
*               type: string
*             email:
*               type: string
*             password:
*               type: string
*             mobile:
*               type: string
*             gender:
*               type: string
*             city:
*               type: string
*         required:
*           - name
*           - email
*           - password
*           - mobile
*           - city
*     responses:
*       201:
*         description: User signedin
*       422:
*         description: Something went wrong
*/

module.exports = router