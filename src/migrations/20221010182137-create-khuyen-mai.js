'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('khuyen_mai', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_km: {
        type: Sequelize.STRING
      },
      thoi_gian_kt: {
        type: Sequelize.DATEONLY
      },
      giam_gia_hd: {
        type: Sequelize.DECIMAL
      },
      anh_event: {
        type: Sequelize.BLOB
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('khuyen_mai');
  }
};