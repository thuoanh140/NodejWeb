'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suat_chieu_phim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      suat_chieu_phim.belongsTo(models.dinh_dang_chieu, { foreignKey: 'movieFormatId', targetKey: 'id', as: 'movieFormatData' }),
        suat_chieu_phim.belongsTo(models.rap, { foreignKey: 'theaterId', targetKey: 'id', as: 'theaterData' }),
        suat_chieu_phim.hasMany(models.ct_hd_ve, { foreignKey: 'id_suat_chieu', as: 'suatChieuId' }),
        suat_chieu_phim.belongsTo(models.Phim, { foreignKey: 'movieId', targetKey: 'id', as: 'movieData' })
      // suat_chieu_phim.belongsTo(models.phong_chieu, { foreignKey: 'cinemaRoomId', targetKey: 'id', as: 'cinemaRoomData' })
    }
  }
  suat_chieu_phim.init({
    provinceId: DataTypes.INTEGER,
    theaterId: DataTypes.INTEGER,
    cinemaRoomId: DataTypes.INTEGER,
    movieFormatId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    showTime: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'suat_chieu_phim',
  });
  return suat_chieu_phim;
};