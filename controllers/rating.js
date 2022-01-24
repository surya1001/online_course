const models = require("../models")
const Sequelize = models.Sequelize
const Op = Sequelize.Op


const addRating = async (req, res) => {
  try {
    const { rating, reviewMessage }= req.body
    const courseId = req.params.courseId
    const userId = req.userDetails.id

    //check whether rating is more than 5
    if(rating > 5) return res.status(400).json({message: "Rating cannot be more than 5"})

    //check whether course exists
    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    //check whether user already enrolled in course
    const enrollldet = await models.enrollment.findOne({
      where:{[Op.and]: [ {courseId}, {studentId: userId} ]},
    })
    if(!enrollldet) return res.status(400).json({message: "Not enrolled to any course yet"})
    if(courseId != enrollldet.courseId) return res.status(400).json({message: "User can review only that course which he has enrolled"})

    //check whether already rated by user for course
    const ratingdet = await models.rating.findOne({
      where:{[Op.and]: [ {courseId}, {userId} ]},
    })
    if(ratingdet) return res.status(400).json({message: "Already rated for course"})
    const createrating = await models.rating.create({ courseId, userId, rating, reviewMessage})
    return res.status(200).json({ message: "Course Rated", createrating })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const updateRating = async (req, res) => {
  try {
    const { rating, reviewMessage }= req.body
    const courseId = req.params.courseId
    const ratingId = req.params.ratingId
    const userId = req.userDetails.id

    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    const ratingdet = await models.rating.findOne({where: {id: ratingId}})
    if(!ratingdet) return res.status(400).json({message: "Rating not found"})

    const enrollldet = await models.rating.findOne({where: {userId: userId, courseId: courseId}})
    if(!enrollldet) return res.status(400).json({message: "Not enrolled to any course yet"})
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
    if(!enrollldet) return res.status(400).json({message: "Not enrolled to any course yet"})
    if(courseId != enrollldet.courseId) return res.status(400).json({message: "User can review only that course which he has enrolled"})

    const deleterating = await models.rating.destroy({ where: {id: id}})
    return res.status(200).json({ message: "Rating deleted", deleterating })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const getAllRatingForCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const userId = req.userDetails.id

    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    const ratingdet = await models.rating.findAll({
      where: {courseId: courseId},
      attributes: ['rating','reviewMessage','createdAt'],
      include: [
        {model: models.classes, attributes: ['title','description','fees','prerequisites']},
        {model: models.user, attributes: ['name','email','mobile']}
      ]
    })
    if(!ratingdet) return res.status(400).json({message: "Rating not found"})
    return res.status(200).json({ ratingdet })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { addRating, updateRating, deleteRating, getAllRatingForCourse }
