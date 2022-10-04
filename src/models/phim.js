'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Phim.belongsToMany(models.The_Loai_Phim, { through: 'Phim_The_Loai_Phim' });
    }
  }
  Phim.init({
    ten_phim: DataTypes.STRING,
    ngay_kc: DataTypes.DATEONLY,
    thoi_luong: DataTypes.STRING,
    dao_dien: DataTypes.STRING,
    dien_vien: DataTypes.STRING,
    quoc_gia: DataTypes.STRING,
    gh_tuoi: DataTypes.STRING,
    tom_tat: DataTypes.TEXT,
    ngon_ngu: DataTypes.STRING,
    poster: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Phim',
  });
  return Phim;
};