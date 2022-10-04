'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phong_chieu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      so_phong: {
        type: Sequelize.INTEGER
      },
      so_day: {
        type: Sequelize.INTEGER
      },
      rapId: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('phong_chieu');
  }
};