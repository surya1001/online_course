const express = require("express")
const { addRating, deleteRating, updateRating, getAllRatingForCourse } = require("../controllers/rating")
const { verifyToken } = require("../middlewares/auth")
const router = express.Router()

router.post("/:courseId", verifyToken, addRating)
router.get("/:courseId", verifyToken, getAllRatingForCourse)
router.put("/:courseId/:ratingId", verifyToken, updateRating)
router.delete("/:id", verifyToken, deleteRating)

/**
* @swagger
* /rating/{courseId}:    
*   post:
*     tags:
*       - Rating
*     summary: Add rating
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: "courseId"
*         in: "path"
*         description: "Course Id"
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             rating:
*               type: string
*             reviewMessage:
*               type: string
*         required:
*           - rating
*           - reviewMessage
*     responses:
*       201:
*         description: Rating added
*       422:
*         description: Something went wrong
*   get:
*     tags:
*       - Rating
*     name: Get Rating details for course
*     summary:  api for getting rating details by course
*     parameters:
*       - name: "courseId"
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
* /rating/{courseId}/{ratingId}:
*   put:
*     tags:
*       - Rating
*     summary: To update a rating
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: "courseId"
*         in: "path"
*         description: "Course Id"
*       - name: "ratingId"
*         in: "path"
*         description: "Rating Id"
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             rating:
*               type: string
*             reviewMessage:
*               type: string
*           required:
*             - rating
*             - reviewMessage
*     responses:
*       200:
*         description: Rating details updated. 
*       422:    
*         description: Something went wrong.
* /rating/{id}:
*   delete:
*     tags:
*       - Rating
*     summary: To delete a rating
*     security:
*       - bearerAuth: []  
*     consumes:
*       - application/json
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "Rating Id"
*     responses:
*       200:
*         description: Rating deleted. 
*       422:    
*         description: Something went wrong.
*/

module.exports = router