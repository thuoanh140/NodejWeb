'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class danh_gia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  danh_gia.init({
    diem_dg: DataTypes.INTEGER,
    noi_dung: DataTypes.TEXT,
    ngay_dg: DataTypes.DATEONLY,
    id_tv: DataTypes.INTEGER,
    id_phim: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'danh_gia',
  });
  return danh_gia;
};