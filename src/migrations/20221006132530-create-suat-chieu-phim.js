'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suat_chieu_phim', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provinceId: {
        type: Sequelize.INTEGER
      },
      theaterId: {
        type: Sequelize.INTEGER
      },
      cinemaRoomId: {
        type: Sequelize.INTEGER
      },
      movieFormatId: {
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.INTEGER
      },
      showTime: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suat_chieu_phim');
  }
};