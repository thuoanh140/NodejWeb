'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('danh_gia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diem_dg: {
        type: Sequelize.INTEGER
      },
      noi_dung: {
        type: Sequelize.TEXT
      },
      ngay_dg: {
        type: Sequelize.DATEONLY
      },
      id_tv: {
        type: Sequelize.INTEGER
      },
      id_phim: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('danh_gia');
  }
};