const {body} = require("express-validator")

exports.addClassesVal = [
  body('title')
    .exists().withMessage('Title is required')
    .notEmpty().withMessage('Title cannot be empty'),

  body('description')
    .exists().withMessage('Description is required')
    .notEmpty().withMessage('Description cannot be empty'),

  body('fees')
    .exists().withMessage('Fees is required')
    .notEmpty().withMessage('Fees cannot be empty'),

  body('prerequisites')
    .exists().withMessage('Prerequisites is required')
    .notEmpty().withMessage('Prerequisites cannot be empty'),

  body('file')
    .exists().withMessage('File is required')
    .notEmpty().withMessage('File cannot be empty'),
]