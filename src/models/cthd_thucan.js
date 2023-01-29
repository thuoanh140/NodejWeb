'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cthd_thucan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cthd_thucan.belongsTo(models.hoa_don_thuc_an, { foreignKey: 'id', targetKey: 'id', as: 'hoadonId' }),
        cthd_thucan.belongsTo(models.thuc_an, { foreignKey: 'id_ta', targetKey: 'id', as: 'foodData' })
    }
  }
  cthd_thucan.init({
    id_ta: DataTypes.INTEGER,
    so_luong: DataTypes.INTEGER,
    don_gia: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'cthd_thucan',
  });
  return cthd_thucan;
};