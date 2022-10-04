'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rap.init({
    ten_rap: DataTypes.STRING,
    dia_chi: DataTypes.STRING,
    email: DataTypes.STRING,
    tinh_tpId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rap',
  });
  return rap;
};