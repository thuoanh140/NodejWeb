'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Phim = require('./phim');
const rap = require('./rap');
const tinh_tp = require('./tinh_tp')
// const Dao_Dien = require('./dao_dien')
// const Dien_Vien = require('./dien_vien')
const The_Loai_Phim = require('./the_loai_phim')
// const Quoc_Gia = require('./quoc_gia')



// Dao_Dien.sync({ alter: true })
// Dien_Vien.sync({ alter: true })
// The_Loai_Phim.sync({ alter: true })
// Quoc_Gia.sync({ alter: true })
// Phim_Dao_Dien.sync({ alter: true })
// Phim_Dien_Vien.sync({ alter: true })
// Phim_Quoc_Gia.sync({ alter: true })
// Phim_The_Loai_Phim.sync({ alter: true })

// module.exports = {
//   Phim,
//   Dao_Dien,
//   Dien_Vien,
//   The_Loai_Phim,
//   Quoc_Gia,
//   Phim_Dao_Dien,
//   Phim_Dien_Vien,
//   Phim_Quoc_Gia,
//   Phim_The_Loai_Phim
// };

// sequelize
//   .sync()
//   .then(result => {
//     console.log('thanh cong', result);
//   })
//   .catch(err => console.log(err));





// let CreateNewMovie = (data) => {
//   return new Promise(async (resolve, reject) => {
//       try {
//           await db.Phim.create({
//               ten_phim: data.ten_phim,
//               ngay_kc: data.ngay_kc,
//               thoi_luong: data.thoi_luong,
//               gh_tuoi: data.gh_tuoi,
//               tom_tat: data.tom_tat,
//               ngon_ngu: data.ngon_ngu,
//               quoc_gia: data.quoc_gia,
//               dao_dien: data.dao_dien,
//               dien_vien: data.dien_vien,
//               poster: data.poster,
//               ten_loai: [{
//                   ten_loai: data.ten_loai,
//               }]
//           }, {
//               include: db.The_Loai_Phim
//           })



//           resolve({
//               errCode: 0,
//               message: 'OK'
//           })
//       } catch (e) {
//           reject(e);
//       }
//   })
// }





module.exports = db;
