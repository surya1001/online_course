const models = require("../models")
const jwt = require("jsonwebtoken")

//signup 
//by default every user is student 
const signup = async (req, res) => {
  try {
    const { name, email, password, mobile, gender, city } = req.body
    const user = await models.user.create({ name, email, password, mobile, gender, city })
    return res.status(200).json({ message: "User created", user })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}


//signin route
const signin = async (req, res) => {
  const { email, password } = req.body

  const user = await models.user.findOne({ where: { email: email } })
  if (!user) return res.status(400).json({ message: "No user found" })

  const passwordMatched = await user.comparePassword(password)
  if (passwordMatched) {
    const role = await models.role.findOne({ where: { id: user.roleId } })
    const token = jwt.sign({ id: user.id, name: user.name, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: "24hr" })
    return res.status(200).json({ message: "User loged in", token: token, role: role.roleName, name: user.name, email: user.email, isLoggedIn: true })
  } else return res.status(400).json({ message: "Invalid credentials" })
}

const addRole = async (req, res) => {
  try{
    const role1 = await models.role.create({roleName: "student", description: "student"})
    const role2 = await models.role.create({roleName: "instructor", description: "instructor"})
    return res.status(200).json({role: role1, role2: role2})
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }
}

module.exports = { signup, signin, addRole }