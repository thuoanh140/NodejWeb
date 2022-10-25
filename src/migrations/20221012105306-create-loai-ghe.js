'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loai_ghe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_loai_ghe: {
        type: Sequelize.STRING
      },
      gia_tien: {
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loai_ghe');
  }
};