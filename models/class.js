module.exports = (sequelize, Sequelize) => {
  const Classes = sequelize.define("classes",{
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "title"
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "description"
    },
    instructorId: {
      type: Sequelize.INTEGER,
      field: "instructor_id",
      allowNull: false
    },
    fees: {
      type: Sequelize.INTEGER,
      field: "fees",
      allowNull: false
    },
    prerequisites: {
      type: Sequelize.STRING,
      field: 'prerequisites',
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      field: "is_active",
      defaultValue: true
    }
  }, {
    freezeTableName: true,
    tableName: "classes"
  })

  //association
  Classes.associate = function (models) {
    Classes.belongsTo(models.user, {foreignKey: "userId", as: "instructor"})
    Classes.hasMany(models.rating, {foreignKey: "classesId"})
    Classes.belongsTo(models.instructor, {foreignKey: "instructorId"})
  }

  return Classes
}
