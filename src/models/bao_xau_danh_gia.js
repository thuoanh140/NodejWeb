'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bao_xau_danh_gia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bao_xau_danh_gia.belongsTo(models.thanh_vien, { foreignKey: 'id_tv', targetKey: 'id', as: 'reportData' }),
        bao_xau_danh_gia.belongsTo(models.danh_gia, { foreignKey: 'id_dg', targetKey: 'id', as: 'ratingData' })
      // define association here
    }
  }
  bao_xau_danh_gia.init({
    noi_dung: DataTypes.TEXT,
    id_dg: DataTypes.INTEGER,
    id_tv: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bao_xau_danh_gia',
  });
  return bao_xau_danh_gia;
};