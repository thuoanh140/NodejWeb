'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suat_chieu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      suat: {
        type: Sequelize.STRING
      },
      ngay_chieu: {
        type: Sequelize.DATEONLY
      },
      phimId: {
        type: Sequelize.INTEGER
      },
      dinh_dang_chieuId: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suat_chieu');
  }
};