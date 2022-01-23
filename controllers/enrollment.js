const models = require("../models")

const enrolloncourse = async (req, res) => {
  try {
    const courseId = req.body.courseId
    const userId = req.userDetails.id

    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    const user = await models.user.findOne({where: {id: userId}})

    const enrollldet = await models.enrollment.findOne({where: {studentId: userId}})
    if(enrollldet){
      if(courseId == enrollldet.courseId) return res.status(400).json({message: "User already enrolled in course"})
    }

    const enroll = await models.enrollment.create({ courseId, studentId: userId})
    const updateuser = await models.user.update({number_of_course_enrolled: ++user.number_of_course_enrolled}, {where: {id: userId}})

    return res.status(200).json({ message: "Course enrolled", enroll, updateuser })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const withdrawfromcourse = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const userId = req.userDetails.id
    console.log(courseId, userId)

    const course = await models.classes.findOne({where: {id: courseId}})
    if(!course) return res.status(400).json({message: "No such course exists"})

    const user = await models.user.findOne({where: {id: userId}})

    const enrollldet = await models.enrollment.findOne({where: {studentId: userId}})
    console.log(enrollldet.courseId, courseId)
    if(courseId != enrollldet.courseId) return res.status(400).json({message: "User not enrolled in course"})

    const deroll = await models.enrollment.destroy({ where: {courseId}})
    const updateuser = await models.user.update({number_of_course_enrolled: --user.number_of_course_enrolled}, {where: {id: userId}})

    return res.status(200).json({ message: "Course withdrawn", deroll, updateuser })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}


module.exports = { enrolloncourse, withdrawfromcourse }
