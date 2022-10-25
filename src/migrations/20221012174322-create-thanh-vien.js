'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thanh_vien', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_loai_tv: {
        type: Sequelize.INTEGER
      },
      ten_tv: {
        type: Sequelize.STRING
      },
      diem_dg: {
        type: Sequelize.INTEGER
      },
      ngay_sinh: {
        type: Sequelize.DATEONLY
      },
      gioi_tinh: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.STRING
      },
      id_tk: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('thanh_vien');
  }
};