const {body} = require("express-validator")

exports.addRatingVal = [
  body('rating')
    .exists().withMessage('Rating is required')
    .notEmpty().withMessage('Rating cannot be empty'),

  body('reviewMessage')
    .exists().withMessage('Review Message is required')
    .notEmpty().withMessage('Review Message cannot be empty'),

]