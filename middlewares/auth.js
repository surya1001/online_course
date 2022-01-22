const jwt = require("jsonwebtoken")
const models = require("../models")

const verifyToken = async (req, res, next ) => {
  const bearerToken = req.headers['authorization'] //get token from header
  if(!bearerToken) return res.json({messgae: "No token found! Please Login"})
  const token = bearerToken.split(" ")[1]
  
  try{
    const decoded = await jwt.verify(token, process.env.JWT_SECRET) //verify token
    req.userDetails = decoded //set userdetails in req
    next()
  }catch(err){
    console.log(err)
    return res.status(500).json({status: true, message: "Please signin again!", data: err})
  }
}

const isInstructor = async (req, res, next) => {
  const roleId = req.userDetails.roleId  //get role from req
  try{
    const role = await models.role.findOne({where: {id: roleId} }) //get role details
    if(role.roleName === "instructor"){
      console.log("Instructor access")
      next()
    }else{
      console.log("Instructor Access denied")
      return res.json({error: "Instructor access denied"})
    }
  }catch(err){
    console.log(err)
    return res.status(500).json({error: "Something went wrong"})
  }
}

module.exports = { verifyToken, isInstructor }
