const express = require("express")
const { addRating, deleteRating, updateRating } = require("../controllers/rating")
const { verifyToken, isInstructor } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const { addClassesVal } = require("../validations/class")
const router = express.Router()

router.post("/", verifyToken, addRating)
router.put("/:ratingId", verifyToken, updateRating)
router.delete("/:id", verifyToken, deleteRating)
// router.put("/:id", addClassesVal, expressValidator, verifyToken, isInstructor, updateCourse)
// router.delete("/:id", verifyToken, isInstructor, deleteCourse)
// router.get("/:id", getCourseDetailsById)
// router.get("/", getAllCourseDetails)

module.exports = router