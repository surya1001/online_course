const getAllstudent = async (req, res) => {
  return res.status(200).json({message: "All students"})
}

const postStudent = async (req, res) => {
  try{
    const { name, email, password } = req.body
  }catch(err){
    res.status(500).json({message: "Something went wrong"})
  }
}

module.exports = { getAllstudent }