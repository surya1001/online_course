const express = require("express")
const { becomeInstructor, updateInstructor } = require("../controllers/instructor")
const { verifyToken } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const { instructorVal, updateInstructorVal } = require("../validations/instructor")
const router = express.Router()

router.post("/", instructorVal, expressValidator, verifyToken, becomeInstructor)
router.put("/", updateInstructorVal, expressValidator, verifyToken, updateInstructor)


/**
* @swagger
* /instructor:    
*   post:
*     tags:
*       - Instructor
*     summary: To become instructor
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             qualification:
*               type: string
*             introductionBrief:
*               type: string
*         required:
*           - qualification
*           - introductionBrief
*     responses:
*       201:
*         description: Instructor added
*       422:
*         description: Something went wrong
*   put:
*     tags:
*       - Instructor
*     summary: To update a instructor details
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             qualification:
*               type: string
*             introductionBrief:
*               type: string
*     responses:
*       200:
*         description: Instructor details updated. 
*       422:    
*         description: Something went wrong.
*/

module.exports = router