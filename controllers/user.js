const models = require("../models")
const jwt = require("jsonwebtoken")

//signup 
//by default every user is student 
const signup = async (req, res) => {
  try {
    const { name, email, password, mobile, gender, city, file } = req.body

    if (file) {
      const dest = file.replace("public/", "")
      const user = await models.user.create({ name, email, password, mobile, gender, city, profilePic: process.env.BASE_URL+dest })
      return res.status(200).json({ message: "User created", user })
    } else {
      const user = await models.user.create({ name, email, password, mobile, gender, city })
      return res.status(200).json({ message: "User created", user })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}


//signin route
const signin = async (req, res) => {
  try{
    
    const { email, password } = req.body
    
    const user = await models.user.findOne({ where: { email: email } })
    if (!user) return res.status(400).json({ message: "No user found" })
    
    const passwordMatched = await user.comparePassword(password)
    if (passwordMatched) {
      const token = jwt.sign({ id: user.id, name: user.name, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: "24hr" })
      return res.status(200).json({ message: "User loged in", token: token, name: user.name, email: user.email, isLoggedIn: true })
    } else return res.status(400).json({ message: "Invalid credentials" })
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Something went wrong"})
  }
}

const getUserDetailsById = async (req, res) => {
  try{
    const userId = req.params.userId

    const user = await models.user.findOne({
      where: {id: userId},
      attributes: ['name','email','mobile','number_of_course_enrolled','gender','city']
    })
    if(!user) return res.status(400).json({message: 'User not found'})
    return res.status(200).json({user})
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Something went wrong"})
  }
}
module.exports = { signup, signin, getUserDetailsById }