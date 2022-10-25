'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ve_ban', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pttt: {
        type: Sequelize.INTEGER
      },
      id_tv: {
        type: Sequelize.INTEGER
      },
      id_km: {
        type: Sequelize.INTEGER
      },
      ngay_ban: {
        type: Sequelize.STRING
      },
      giam_gia_ve: {
        type: Sequelize.DECIMAL
      },
      trang_thai_ve: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ve_ban');
  }
};