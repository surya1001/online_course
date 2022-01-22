module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define("enrollment",{
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
      field: "enrollment_date"
    }
  }, {
    freezeTableName: true,
    tableName: "enrollment"
  })

  return Enrollment
}