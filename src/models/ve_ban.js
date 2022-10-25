'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ve_ban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ve_ban.hasMany(models.ct_hd_ve, { foreignKey: 'id', as: 'ticketData' })
    }
  }
  ve_ban.init({
    id_pttt: DataTypes.INTEGER,
    id_tv: DataTypes.INTEGER,
    id_km: DataTypes.INTEGER,
    ngay_ban: DataTypes.STRING,
    giam_gia_ve: DataTypes.DECIMAL,
    trang_thai_ve: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 've_ban',
  });
  return ve_ban;
};