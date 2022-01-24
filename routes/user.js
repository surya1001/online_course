const express = require("express")
const router = express.Router()

//require modules
const { signup, signin, getUserDetailsById } = require("../controllers/user")
const { signupVal, signinVal, picVal } = require("../validations/user")
const expressValidator = require("../middlewares/expressValidator")
const { verifyToken } = require("../middlewares/auth")

router.post("/signup", signupVal, expressValidator, signup)
router.post("/signin", signinVal, expressValidator, signin)
router.get("/:userId", verifyToken, getUserDetailsById)

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
*             file:
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
* /user/{userId}:
*   get:
*     tags:
*       - User
*     name: Get User detail
*     summary:  api for getting user detail by id
*     parameters:
*       - name: "userId"
*         in: "path"
*         description: "User Id"
*     security:
*       - bearerAuth: [] 
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Data found 
*       404:
*         description: Data not found
*/

module.exports = router