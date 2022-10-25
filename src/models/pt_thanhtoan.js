'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pt_thanhtoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pt_thanhtoan.init({
    ten_pttt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pt_thanhtoan',
  });
  return pt_thanhtoan;
};