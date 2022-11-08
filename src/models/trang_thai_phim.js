'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trang_thai_phim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trang_thai_phim.init({
    ten_trang_thai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trang_thai_phim',
  });
  return trang_thai_phim;
};