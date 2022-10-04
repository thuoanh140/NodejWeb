'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class The_Loai_Phim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      The_Loai_Phim.belongsToMany(models.Phim, { through: 'Phim_The_Loai_Phim' });
    }
  }
  The_Loai_Phim.init({
    ten_loai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'The_Loai_Phim',
  });
  return The_Loai_Phim;
};