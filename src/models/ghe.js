'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ghe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ghe.belongsTo(models.loai_ghe, { foreignKey: 'id_loai_ghe', targetKey: 'id', as: 'seatTypeData' }),
        ghe.belongsTo(models.phong_chieu, { foreignKey: 'id_phong_chieu', targetKey: 'id', as: 'cinemaRoomData' }),
        ghe.hasMany(models.ct_hd_ve, { foreignKey: 'id_ghe', as: 'seatId' })
    }
  }
  ghe.init({
    ten_ghe: DataTypes.STRING,
    da_chon: DataTypes.BOOLEAN,
    id_loai_ghe: DataTypes.INTEGER,
    id_phong_chieu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ghe',
  });
  return ghe;
};