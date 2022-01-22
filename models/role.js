module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role",{
    roleName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "name",
    },
    description: {
      type: Sequelize.STRING,
      field: "email",
      allowNull: false
    },
  }, {
    freezeTableName: true,
    tableName: "role"
  })

  //association
  Role.associate = function (models) {
    Role.hasMany(models.user,{foreignKey: "role_id"});
  }
  return Role
}