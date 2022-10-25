'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loai_thanhvien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  loai_thanhvien.init({
    ten_loai_tv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'loai_thanhvien',
  });
  return loai_thanhvien;
};