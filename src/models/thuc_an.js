'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thuc_an extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  thuc_an.init({
    ten_ta: DataTypes.STRING,
    gia: DataTypes.DECIMAL,
    so_luong: DataTypes.INTEGER,
    ghi_chu: DataTypes.TEXT,
    anh: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'thuc_an',
  });
  return thuc_an;
};