//external packages
const express = require("express")
const cors = require("cors")
const db = require("./models/index")
const dotenv = require("dotenv")

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

db.sequelize.sync({})
.then(() => console.log("DATABASE CONNECTED"))
.catch(err => console.log(err))

app.use("/api", require("./routes/index"))

app.use((req, res) => {
  res.status(500).json({message: "Url not found"})
})

port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})