'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ct_hd_ve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ct_hd_ve.belongsTo(models.ghe, { foreignKey: 'id_ghe', targetKey: 'id', as: 'seatId' }),
        ct_hd_ve.belongsTo(models.suat_chieu_phim, { foreignKey: 'id_suat_chieu', targetKey: 'id', as: 'suatChieuId' }),
        ct_hd_ve.belongsTo(models.ve_ban, { foreignKey: 'id', targetKey: 'id', as: 'ticketData' })
    }
  }
  ct_hd_ve.init({
    id_ghe: DataTypes.INTEGER,
    id_suat_chieu: DataTypes.INTEGER,
    so_luong_ve: DataTypes.INTEGER,
    don_gia_ve: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ct_hd_ve',
  });
  return ct_hd_ve;
};