const express = require("express")
const { createCourse, updateCourse, deleteCourse, getCourseDetailsById, getAllCourseDetails } = require("../controllers/class")
const { verifyToken, isInstructor } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const { addClassesVal } = require("../validations/class")
const router = express.Router()

router.post("/", addClassesVal, expressValidator, verifyToken, isInstructor, createCourse)
router.put("/:id", addClassesVal, expressValidator, verifyToken, isInstructor, updateCourse)
router.delete("/:id", verifyToken, isInstructor, deleteCourse)
router.get("/:id", getCourseDetailsById)
router.get("/", getAllCourseDetails)

/**
* @swagger
* /class:    
*   post:
*     tags:
*       - Course
*     summary: Add course by instructor
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
*             title:
*               type: string
*             description:
*               type: string
*             fees:
*               type: integer
*             prerequisites:
*               type: string
*         required:
*           - title
*           - description
*           - fees
*           - prerequisites
*     responses:
*       201:
*         description: Course added
*       422:
*         description: Something went wrong
*   get:
*     tags:
*       - Course
*     name: Get all course details
*     summary:  api for getting all course details
*     security:
*       - bearerAuth: [] 
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Data found 
*       404:
*         description: Data not found
* /class/{id}:
*   put:
*     tags:
*       - Course
*     summary: To update a course
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "Course Id"
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             title:
*               type: string
*             description:
*               type: string
*             fees:
*               type: integer
*             prerequisites:
*               type: string
*           required:
*             - title
*             - description
*             - fees
*             - prerequisites
*     responses:
*       200:
*         description: Course details updated. 
*       422:    
*         description: Something went wrong.
*   delete:
*     tags:
*       - Course
*     summary: To delete a course
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "Course Id"
*     responses:
*       200:
*         description: Course deleted. 
*       422:    
*         description: Something went wrong.
* /class/{courseId}:
*   get:
*     tags:
*       - Course
*     name: Get Course details
*     summary:  api for getting course details by id
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "course Id"
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