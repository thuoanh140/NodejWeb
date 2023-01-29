'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hoa_don_thuc_an extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hoa_don_thuc_an.hasMany(models.cthd_thucan, { foreignKey: 'id', as: 'hoadonId' }),
        hoa_don_thuc_an.belongsTo(models.rap, { foreignKey: 'id_rap', targetKey: 'id', as: 'billData' }),
        hoa_don_thuc_an.belongsTo(models.thanh_vien, { foreignKey: 'id_tv', targetKey: 'id', as: 'sdtFood' })
    }
  }
  hoa_don_thuc_an.init({
    ngay_ban: DataTypes.STRING,
    giam_gia_hd: DataTypes.DECIMAL,
    trang_thai_hd: DataTypes.BOOLEAN,
    id_pttt: DataTypes.INTEGER,
    id_km: DataTypes.INTEGER,
    id_tv: DataTypes.INTEGER,
    id_rap: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hoa_don_thuc_an',
  });
  return hoa_don_thuc_an;
};