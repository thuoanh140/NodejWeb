'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ghe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_ghe: {
        type: Sequelize.STRING
      },
      da_chon: {
        type: Sequelize.BOOLEAN
      },
      id_loai_ghe: {
        type: Sequelize.INTEGER
      },
      id_phong_chieu: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ghe');
  }
};