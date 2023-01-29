'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phong_chieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      phong_chieu.hasMany(models.ghe, { foreignKey: 'id_phong_chieu', as: 'cinemaRoomData' }),
        phong_chieu.belongsTo(models.rap, { foreignKey: 'rapId', targetKey: 'id', as: 'rapData' })
      // phong_chieu.hasMany(models.suat_chieu_phim, { foreignKey: 'cinemaRoomId', as: 'cinemaRoomData' }),
    }
  }
  phong_chieu.init({
    so_phong: DataTypes.INTEGER,
    so_day: DataTypes.INTEGER,
    rapId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'phong_chieu',
  });
  return phong_chieu;
};