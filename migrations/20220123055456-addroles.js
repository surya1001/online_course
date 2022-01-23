const models = require("../models")

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await models.role.create({roleName: "student", description: "student"})
    await models.role.bulkCreate([
      {roleName: "student", description: "student"},
      {roleName: "instructor", description: "instructor"}
    ])
  }, 

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
