'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nhan_Vien', {
      id_nv: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_nv: {
        type: Sequelize.STRING(50)
      },
      ngay_sinh: {
        type: Sequelize.DATE
      },
      gioi_tinh: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.CHAR(12)
      },
      dia_chi: {
        type: Sequelize.STRING
      },
      anh_dai_dien: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nhan_Vien');
  }
};