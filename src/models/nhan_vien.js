'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nhan_Vien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nhan_Vien.init({
    ten_nv: DataTypes.STRING,
    ngay_sinh: DataTypes.DATE,
    gioi_tinh: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    sdt: DataTypes.CHAR,
    dia_chi: DataTypes.STRING,
    anh_dai_dien: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nhan_Vien',
  });
  return Nhan_Vien;
};