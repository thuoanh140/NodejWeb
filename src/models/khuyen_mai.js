'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class khuyen_mai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  khuyen_mai.init({
    ten_km: DataTypes.STRING,
    thoi_gian_kt: DataTypes.DATEONLY,
    giam_gia_hd: DataTypes.DECIMAL,
    anh_event: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'khuyen_mai',
  });
  return khuyen_mai;
};