'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dinh_dang_chieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dinh_dang_chieu.hasMany(models.suat_chieu_phim, { foreignKey: 'movieFormatId', as: 'movieFormatData' })
    }
  }
  dinh_dang_chieu.init({
    ten_ddc: DataTypes.STRING,
    phu_thu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dinh_dang_chieu',
  });
  return dinh_dang_chieu;
};