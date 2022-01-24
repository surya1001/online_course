const models = require("../models")

const createCourse = async (req, res) => {
  try {
    const userId = req.userDetails.id
    const roleId = req.userDetails.roleId
    const { title, description, fees, prerequisites, file } = req.body

    const role = await models.role.findOne({where: {id: roleId}})
    if(role.roleName !== "instructor") return res.status({message: "Only instructor can add course"})

    const instructor = await models.instructor.findOne({ where: { userId }})
    numberOfCourses = instructor.numberOfCourses

    const dest = file.replace("public/", "")
    const classes = await models.classes.create({ title, description, instructorId: instructor.id, fees, prerequisites, coursePic: process.env.BASE_URL + dest })
    
    //increase no of course count by instructor
    const updateuser = await models.instructor.update({ numberOfCourses: ++numberOfCourses }, {where: {userId} })

    return res.status(200).json({ message: "Course created", classes, updateuser })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.userDetails.id
    const roleId = req.userDetails.roleId
    const { title, description, fees, prerequisites, file } = req.body

    const role = await models.role.findOne({where: {id: roleId}})
    if(role.roleName !== "instructor") return res.status({message: "Only instructor can update course"})

    const instructordet = await models.instructor.findOne({ where: {userId}})

    const classinfo = await models.classes.findOne({where:{ id }})
    if(classinfo.instructorId != instructordet.id) return res.status(400).json({message: "You can only update course added by you"})

    const dest = file.replace("public/", "")
    const classes = await models.classes.update({ title, description, fees, prerequisites, coursePic: process.env.BASE_URL + dest }, {where: {id}})
    
    return res.status(200).json({ message: "Course updated", classes })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.userDetails.id
    const roleId = req.userDetails.roleId

    const role = await models.role.findOne({where: {id: roleId}})
    if(role.roleName !== "instructor") return res.status({message: "Only instructor can delete course"})
    
    const instructor = await models.instructor.findOne({ where: { userId }})
    const classinfo = await models.classes.findOne({where:{ id }})
    if(classinfo.instructorId != instructor.id) return res.status(400).json({message: "You can only delete course added by you"})

    const classes = await models.classes.destroy({ where: {id} })

    //decrease number of course count by instructor
    const updateuser = await models.instructor.update({ numberOfCourses: --instructor.numberOfCourses }, {where: { userId } })
    return res.status(200).json({ message: "Course deleted", classes, updateuser })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const getCourseDetailsById = async (req, res) => {
  try{
    const id = req.params.id
    
    const course = await models.classes.findOne({
      where: { id },
      attributes: ['title', 'description', 'fees', 'prerequisites'],
      include: {
        model: models.instructor,
        attributes: ['qualification','introductionBrief','numberOfCourses'],
        include: { 
          model: models.user,
          attributes: ['name','email']
        }
      }
    })
    return res.status(200).json({ course })
  }catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const getAllCourseDetails = async (req, res) => {
  try{
    const courses = await models.classes.findAll({
      attributes: ['id','title', 'description', 'fees', 'prerequisites'],
      include: {
        model: models.instructor,
        attributes: ['qualification','introductionBrief','numberOfCourses'],
        include: { 
          model: models.user,
          attributes: ['name','email']
        }
      }
    })
    return res.status(200).json({ courses })
  }catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = {createCourse, updateCourse, deleteCourse, getCourseDetailsById, getAllCourseDetails}