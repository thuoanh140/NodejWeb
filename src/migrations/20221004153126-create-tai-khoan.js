'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tai_Khoan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_tk: {
        type: Sequelize.STRING
      },
      mat_khau: {
        type: Sequelize.STRING
      },
      id_nv: {
        type: Sequelize.INTEGER
      },
      id_tv: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tai_Khoan');
  }
};