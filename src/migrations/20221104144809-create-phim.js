'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Phim', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_phim: {
        type: Sequelize.STRING
      },
      ngay_kc: {
        type: Sequelize.DATEONLY
      },
      thoi_luong: {
        type: Sequelize.STRING
      },
      dao_dien: {
        type: Sequelize.STRING
      },
      dien_vien: {
        type: Sequelize.STRING
      },
      quoc_gia: {
        type: Sequelize.STRING
      },
      gh_tuoi: {
        type: Sequelize.STRING
      },
      tom_tat: {
        type: Sequelize.TEXT
      },
      ngon_ngu: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.BLOB
      },
      the_loai: {
        type: Sequelize.STRING
      },
      id_trang_thai: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Phim');
  }
};