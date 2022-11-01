'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vai_tro: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role');
  }
};