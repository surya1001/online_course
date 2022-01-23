module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define("enrollment", {
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'student_id'
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "course_id"
    },
    enrollmentDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: "enrollment_date",
      defaultValue: Sequelize.NOW,
    }
  }, {
    freezeTableName: true,
    tableName: "enrollment"
  })

  //association
  Enrollment.associate = function (models) {
    Enrollment.belongsTo(models.user, { foreignKey: 'studentId' });
    Enrollment.belongsTo(models.classes, { foreignKey: 'courseId' })
  }


  return Enrollment
}