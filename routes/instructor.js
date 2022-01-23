const express = require("express")
const { becomeInstructor, updateInstructor, getInstructorDet, getAllInstructorDet } = require("../controllers/instructor")
const { verifyToken } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const { instructorVal, updateInstructorVal } = require("../validations/instructor")
const router = express.Router()

router.post("/", instructorVal, expressValidator, verifyToken, becomeInstructor)
router.put("/", updateInstructorVal, expressValidator, verifyToken, updateInstructor)
router.get("/", verifyToken, getAllInstructorDet)
router.get("/:id", verifyToken, getInstructorDet)

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
*       - name: "id"
*         in: "path"
*         description: "Instructor Id"
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
*   get:
*     tags:
*       - Instructor
*     name: Get instructor details
*     summary:  api for getting all instructor details
*     security:
*       - bearerAuth: [] 
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Data found 
*       404:
*         description: Data not found
* /instructor/{id}:
*   get:
*     tags:
*       - Instructor
*     name: Get instructor details by id
*     summary:  api for getting instructor details by id
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "Instructor Id"
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