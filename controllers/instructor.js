const models = require("../models")

const becomeInstructor = async (req, res) => {
  try {
    const userId = req.userDetails.id
    console.log(userId)
    const { qualification, introductionBrief } = req.body

    const user = await models.user.findOne({where: {id: userId}})
    if(user.roleId == 2) return res.status(400).json({message: "User already an instructor"})

    const instructor = await models.instructor.create({ userId, qualification, introductionBrief })
    const updateuser = await models.user.update({ roleId: 2}, {where: {id: userId} })
    return res.status(200).json({ message: "Instructor created", instructor, updateuser })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const updateInstructor = async (req, res) => {
  try {
    const userId = req.userDetails.id
    const { qualification, introductionBrief } = req.body

    const instructor = await models.instructor.update({ qualification, introductionBrief }, { where: { userId }})
    return res.status(200).json({ message: "Instructor created", instructor })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { becomeInstructor, updateInstructor }
