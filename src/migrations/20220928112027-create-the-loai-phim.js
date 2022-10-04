'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('The_Loai_Phim', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_loai: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('The_Loai_Phim');
  }
};