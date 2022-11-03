'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bao_xau_danh_gia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noi_dung: {
        type: Sequelize.TEXT
      },
      id_dg: {
        type: Sequelize.INTEGER
      },
      id_tv: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bao_xau_danh_gia');
  }
};