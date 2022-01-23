const bcrypt = require("bcryptjs")
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user",{
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "name",
      validate: {
        len: {
          args: [0, 30]
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      field: "email",
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      field: "password",
      allowNull: false
    },
    mobile: {
      type: Sequelize.STRING,
      field: "mobie",
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      field: "gender"
    },
    city: {
      type: Sequelize.STRING,
      field: "city",
      allowNull: "false"
    },
    number_of_course_enrolled: {
      type: Sequelize.INTEGER,
      field: "number_of_course_enrolled",
      defaultValue: 0
    },
    roleId: {
      type: Sequelize.INTEGER,
      field: "role_id",
      defaultValue: 1
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      field: "is_active",
      defaultValue: true
    } 
  }, {
    freezeTableName: true,
    tableName: "user"
  })


  //association
  User.associate = function (models) {
    User.hasOne(models.instructor, {foreignKey: "userId"})
    User.belongsTo(models.role, { foreignKey: 'roleId' });
    User.hasMany(models.enrollment, { foreignKey: 'studentId' });  
    User.hasMany(models.rating, { foreignKey: 'userId' });  
  }

  //hook to run before create
  User.beforeCreate(function (user, options, cb){
    if(user.password){
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt){
          if(err){
            return err
          }
          bcrypt.hash(user.password, salt, function (err, hash){
            if(err){
              return err
            }
            user.password = hash
            return resolve(user, options)
          })
        })
      })
    }
  })

  //hook to run before update
  User.beforeUpdate(function (user, options, cb){
    if(user.password){
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt){
          if(err){
            return err
          }
          bcrypt.hash(user.password, salt, function (err, hash){
            if(err){
              return err
            }
            user.password = hash
            return resolve(user, options)
          })
        })
      })
    }
  })

  //method for comparing password
  User.prototype.comparePassword = function (passw, cb){
    return new Promise((resolve, reject) => {
      bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err){
          return err
        }
        return resolve(isMatch)
      })
    })
  }

  return User
}