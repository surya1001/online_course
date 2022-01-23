//external packages
const express = require("express")
const cors = require("cors")
const db = require("./models/index")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")
const swagger = require("./utils/swagger")


const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger.swaggerSpec)); //Swagger setup



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