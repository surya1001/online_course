const express = require("express");
const router = express.Router()

router.use("/user", require("./user"))
router.use("/instructor", require("./instructor"))
router.use("/class", require("./class"))

module.exports = router