module.exports = (sequelize, Sequelize) => {
  const Instructor = sequelize.define("instructor",{
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    qualification: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "name",
    },
    introductionBrief: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "introduction_brief",
    },
    numberOfCourses: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "number_of_courses"
    }
  }, {
    freezeTableName: true,
    tableName: "instructor"
  })

  //association
  Instructor.associate = function (models) {
    Instructor.belongsTo(models.user, {foreignKey: "userId"})
    Instructor.hasMany(models.classes, {foreignKey: "instructorId"})
  }
  return Instructor
}