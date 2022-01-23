module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating",{
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "course_id"
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "rating"
    },
    reviewMessage: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "review_message"
    }
  }, {
    freezeTableName: true,
    tableName: "rating"
  })


  //association
  Rating.associate = function (models) {
    Rating.belongsTo(models.classes, {foreignKey: "courseId"})
    Rating.belongsTo(models.user, {foreignKey: "userId"})
  }
  

  return Rating
}