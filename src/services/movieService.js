import db from '../models/index'

let getMovieNowShowingService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movies = await db.Phim.findAll({
                limit: limitInput,
                order: [['id', 'ASC']],
                raw: false,
                nest: true

            })
            // if (data && data.poster) {
            //     data.poster = new Buffer(data.poster, 'base64').toString('binary');
            // }

            resolve({
                errCode: 0,
                data: movies

            })
        } catch (e) {
            reject(e);
        }
    })
}

let getMovieNowShowingById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Phim.findOne({
                where: {
                    ten_phim: inputId
                },
                raw: true,
                nest: true

            })
            if (data && data.poster) {
                data.poster = new Buffer(data.poster, 'base64').toString('binary');
            }

            resolve({
                errCode: 0,
                data: data

            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllMovie = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movies = '';
            if (movieId === 'ALL') {
                movies = await db.Phim.findAll({

                })
            }
            if (movieId && movieId !== 'ALL') {
                movies = await db.Phim.findOne({
                    where: { id: movieId }
                })
            }

            resolve(movies)
        } catch (e) {
            reject(e);
        }
    })
}

let getProvinceService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let province = await db.tinh_tp.findAll();
            res.errCode = 0;
            res.data = province;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

let getTheaterService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let theater = await db.rap.findAll(
                // {
                //     where: { tinh_tpId: tinh_tpId }
                // }
            );
            res.errCode = 0;
            res.data = theater;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

let getCinemaRoomService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let cinema_room = await db.phong_chieu.findAll();
            res.errCode = 0;
            res.data = cinema_room;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

// let create_rap = async () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // db.tinh_tp.hasMany(db.rap);
//             // db.rap.belongsTo(db.tinh_tp);
//             // await db.tinh_tp.sync();
//             // await db.rap.sync();
//             await db.rap.create(
//                 {
//                     ten_rap: "On Cinema Gò Vấp",
//                     dia_chi: 'Gò Vấp',
//                     email: 'oncinema@gmail.com',
//                     tinh_tpId: 1
//                 },
//                 {
//                     include: db.tinh_tp
//                 }
//             );
//             resolve();
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// create_rap();



module.exports = {
    getMovieNowShowingService: getMovieNowShowingService,
    getAllMovie: getAllMovie,
    getMovieNowShowingById: getMovieNowShowingById,
    getProvinceService: getProvinceService,
    getTheaterService: getTheaterService,
    getCinemaRoomService: getCinemaRoomService
}