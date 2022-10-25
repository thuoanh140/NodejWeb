'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suat_chieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  suat_chieu.init({
    suat: DataTypes.STRING,
    ngay_chieu: DataTypes.DATEONLY,
    phimId: DataTypes.INTEGER,
    dinh_dang_chieuId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'suat_chieu',
  });
  return suat_chieu;
};