const {body} = require("express-validator")
const models = require('../models');
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.signupVal = [
  body('name')
    .exists().withMessage('Name is required')
    .notEmpty().withMessage('Name cannot be empty'),
  
  body('mobile')
    .exists().withMessage('Mobile number is required')
    .notEmpty().withMessage('Mobile number cannot be empty')
    .isLength({ min: 10 }).withMessage("Mobile Number must be atleast 10 characters")
    .custom(async value => {
      return await models.user.findOne({
        where: {
          mobile: {
            [Op.iLike]: value
          },
          isActive: true
        }
      }).then(mobile => {
        if (mobile) {
          return Promise.reject("Mobile number already exist !");
        }
      })
    }),

  body('email')
    .exists().withMessage('Email is required')
    .isLength({ max: 60 }).withMessage("Email must be less than 60 characters")
    .normalizeEmail().isEmail().withMessage("Invalid Email Format")
    .custom(async value => {
      return await models.user.findOne({
        where: {
          email: {
            [Op.iLike]: value
          },
          isActive: true
        }
      }).then(email => {
        if (email) {
          return Promise.reject("Email already exist !");
        }
      })
    }),

  body('password')
    .exists().withMessage('Password is required')
    .notEmpty().withMessage('password cannot be empty')
    .isLength({ min: 6}).withMessage("Password must be minimum 6 characters"),

  body('city')
    .exists().withMessage('City is required')
    .notEmpty().withMessage('City cannot be empty'),
]

exports.signinVal = [
  body('email')
    .exists().withMessage('Email address is required')
    .notEmpty().withMessage('Email address cannot be empty')
    .normalizeEmail().isEmail().withMessage('Enter vaild email address'),
  
  body('password')
    .exists().withMessage('Password is required')
    .notEmpty().withMessage('Password cannot be empty'),
]
