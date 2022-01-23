const models = require("../models")

const addRating = async (req, res) => {
  try {
    const { courseId, rating, reviewMessage }= req.body
    const userId = req.userDetails.id
    console.log(courseId, rating, userId)

    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    const enrollldet = await models.enrollment.findOne({where: {studentId: userId}})
    if(courseId != enrollldet.courseId) return res.status(400).json({message: "User can review only that course which he has enrolled"})

    const createrating = await models.rating.create({ courseId, userId, rating, reviewMessage})
    return res.status(200).json({ message: "Course Rated", createrating })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const updateRating = async (req, res) => {
  try {
    const { courseId, rating, reviewMessage }= req.body
    const ratingId = req.params.ratingId
    const userId = req.userDetails.id

    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    const ratingdet = await models.rating.findOne({where: {id: ratingId}})
    if(!ratingdet) return res.status(400).json({message: "Rating not found"})

    const enrollldet = await models.rating.findOne({where: {userId: userId, courseId: courseId}})
    if(courseId != enrollldet.courseId) return res.status(400).json({message: "User can review only that course which he has enrolled"})

    const createrating = await models.rating.update({ rating, reviewMessage}, {where: {id: ratingId}})
    return res.status(200).json({ message: "Course Rated", createrating })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const deleteRating = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.userDetails.id

    const rating = await models.rating.findOne({where: {id: id}})
    if(!rating) return res.status(400).json({message: "No review found"})

    const enrollldet = await models.rating.findOne({where: {userId: userId, courseId: courseId}})
    if(courseId != enrollldet.courseId) return res.status(400).json({message: "User can review only that course which he has enrolled"})

    const deleterating = await models.rating.destroy({ where: {id: id}})
    return res.status(200).json({ message: "Rating deleted", deleterating })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { addRating, updateRating, deleteRating }
