'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loai_ghe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      loai_ghe.hasMany(models.ghe, { foreignKey: 'id_loai_ghe', as: 'seatTypeData' })
    }
  }
  loai_ghe.init({
    ten_loai_ghe: DataTypes.STRING,
    gia_tien: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'loai_ghe',
  });
  return loai_ghe;
};