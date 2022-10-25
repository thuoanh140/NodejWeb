'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cthd_thucan', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ta: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      so_luong: {
        type: Sequelize.INTEGER
      },
      don_gia: {
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cthd_thucan');
  }
};