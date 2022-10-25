'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thuc_an', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_ta: {
        type: Sequelize.STRING
      },
      gia: {
        type: Sequelize.DECIMAL
      },
      so_luong: {
        type: Sequelize.INTEGER
      },
      ghi_chu: {
        type: Sequelize.TEXT
      },
      anh: {
        type: Sequelize.BLOB
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('thuc_an');
  }
};