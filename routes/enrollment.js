const express = require("express")
const { enrolloncourse, withdrawfromcourse, getEnrolledCourse } = require("../controllers/enrollment")
const { becomeInstructor, updateInstructor } = require("../controllers/instructor")
const { verifyToken } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const { instructorVal, updateInstructorVal } = require("../validations/instructor")
const router = express.Router()

router.post("/", verifyToken, enrolloncourse)
router.delete("/:courseId", verifyToken, withdrawfromcourse)
router.get("/", verifyToken, getEnrolledCourse)

/**
* @swagger
* /enroll:    
*   post:
*     tags:
*       - Enroll Course
*     summary: To enroll on course
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
*             courseId:
*               type: integer
*         required:
*           - courseId
*     responses:
*       201:
*         description: Course enrolled
*       422:
*         description: Something went wrong
*   get:
*     tags:
*       - Enroll Course
*     name: Get All Enrolled Course APIs
*     summary:  api for getting all courses enrolled
*     security:
*       - bearerAuth: [] 
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Data found 
*       404:
*         description: Data not found
* /enroll/{courseId}:
*   delete:
*     tags:
*       - Enroll Course
*     summary: To withdraw from course
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: "courseId"
*         in: "path"
*         description: "Withdraw from course"
*         required: true
*         type: integer
*     responses:
*       200:
*         description: Course withdrawn. 
*       422:    
*         description: Something went wrong.
*/

module.exports = router