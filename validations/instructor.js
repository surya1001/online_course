const {body} = require("express-validator")
const models = require('../models');
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.instructorVal = [
  body('qualification')
    .exists().withMessage('Qualification is required')
    .notEmpty().withMessage('Qualification cannot be empty'),

  body("introductionBrief")
    .exists().withMessage("Introduction Brief is required")
    .notEmpty().withMessage("Introduction Brief cannot be empty"),
]


exports.updateInstructorVal = [
  body('qualification')
    .exists().withMessage('Qualification is required')
    .notEmpty().withMessage('Qualification cannot be empty'),

  body("introductionBrief")
    .exists().withMessage("Introduction Brief is required")
    .notEmpty().withMessage("Introduction Brief cannot be empty"),
]