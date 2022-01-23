const express = require("express");
const router = express.Router()

router.use("/user", require("./user"))
router.use("/instructor", require("./instructor"))
router.use("/class", require("./class"))
router.use("/enroll", require("./enrollment"))
router.use("/rating", require("./rating"))

module.exports = router