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

module.exports = router