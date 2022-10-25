'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hoa_don_thuc_an', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ngay_ban: {
        type: Sequelize.STRING
      },
      giam_gia_hd: {
        type: Sequelize.DECIMAL
      },
      trang_thai_hd: {
        type: Sequelize.BOOLEAN
      },
      id_pttt: {
        type: Sequelize.INTEGER
      },
      id_km: {
        type: Sequelize.INTEGER
      },
      id_tv: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hoa_don_thuc_an');
  }
};