'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thanh_vien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // thanh_vien.belongsTo(models.Tai_Khoan);
      thanh_vien.belongsTo(models.loai_thanhvien, { foreignKey: 'id_loai_tv', targetKey: 'id', as: 'loai_tv' })
    }
  }
  thanh_vien.init({
    id_loai_tv: DataTypes.INTEGER,
    ten_tv: DataTypes.STRING,
    diem_dg: DataTypes.INTEGER,
    ngay_sinh: DataTypes.DATEONLY,
    gioi_tinh: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    sdt: DataTypes.STRING,
    id_tk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'thanh_vien',
  });
  return thanh_vien;
};