module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating",{
    classesId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "enrollment_id"
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
    Rating.belongsTo(models.user, {foreignKey: "classesId"})
  }

  return Rating
}