'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ct_hd_ve', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ghe: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_suat_chieu: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      so_luong_ve: {
        type: Sequelize.INTEGER
      },
      don_gia_ve: {
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ct_hd_ve');
  }
};