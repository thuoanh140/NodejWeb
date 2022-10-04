'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tai_Khoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tai_Khoan.init({
    ten_tk: DataTypes.STRING,
    mat_khau: DataTypes.STRING,
    id_nv: DataTypes.INTEGER,
    id_tv: DataTypes.INTEGER,
    id_vt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tai_Khoan',
  });
  return Tai_Khoan;
};