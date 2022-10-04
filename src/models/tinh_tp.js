'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tinh_tp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  tinh_tp.init({
    ten_tinh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tinh_tp',
  });
  return tinh_tp;
};