const express = require("express");
const router = express.Router()
const { postImage } = require("../middlewares/uploadImage")

router.use("/user", require("./user"))
router.use("/instructor", require("./instructor"))
router.use("/class", require("./class"))
router.use("/enroll", require("./enrollment"))
router.use("/rating", require("./rating"))
router.post("/image", postImage)

/**
* @swagger
* /image:
*   post:
*     tags:
*       - Image
*     summary: To upload pictures
*     consumes:
*       - multipart/form-data
*     parameters:
*       - in: formData
*         name: file
*         type: file
*         description: The file to upload.
*       - in: query
*         name: reason
*         schema:
*           type: string
*         description: query is profile for user and course for course
*     responses:
*       201:
*         description: Picture Uploaded
*       422:
*         description: Something went wrong
*/


module.exports = router