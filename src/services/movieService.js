import db from '../models/index';
import _, { result, sumBy } from 'lodash';
import emailService from './emailService';
import express from "express";
import { stringify } from 'querystring';
let router = express.Router();
const VNPay = require('node-vnpay');



// ESM
// import { OnePayDomestic } from 'vn-payments';
// import { OnePayInternational } from 'vn-payments';
// import { VNPay } from 'vn-payments';
// import { SohaPay } from 'vn-payments';
// import { NganLuong } from 'vn-payments';
// CommonJS
const { OnePayDomestic } = require('vn-payments');
const { OnePayInternational } = require('vn-payments');
// const { VNPay } = require('vn-payments');
const { SohaPay } = require('vn-payments');
const { NganLuong } = require('vn-payments');


// const onepayIntl = new OnePayInternational({
//     paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
//     merchant: 'thuoanh140@gmail.com',
//     accessCode: '7J3FP9LC',
//     secureSecret: 'JOARTEJWKARRBHUVNBHNQDJYVWOMONRI',
// });

// routes.post('/payment/checkout', (req, res) => {
//     const params = Object.assign({}, req.body);

//     // construct checkout payload from form data and app's defaults
//     const checkoutData = {
//         amount: parseInt(params.amount, 10),
//         customerId: params.email,
//         currency: 'VND',
//         /*...*/
//     };

//     // buildCheckoutUrl is async operation and will return a Promise
//     onepayIntl
//         .buildCheckoutUrl(checkoutData)
//         .then(checkoutUrl => {
//             res.writeHead(301, { Location: checkoutUrl.href });
//             res.end();
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

// routes.get('/payment/callback', (req, res) => {
//     const query = req.query;

//     onepayIntl.verifyReturnUrl(query).then(results => {
//         if (results.isSucceed) {
//             res.render('success', {
//                 title: 'On Cinema - Thank You',
//                 orderId: results.orderId,
//                 price: results.price,
//                 message: results.message,
//             });
//         } else {
//             res.render('errors', {
//                 title: 'On Cinema - Payment Errors',
//                 message: results.message,
//             });
//         }
//     });
// });


// router.post('/create_payment_url', function (req, res, next) {
//     var ipAddr = req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     var config = require('config');
//     var dateFormat = require('dateformat');


//     var tmnCode = config.get('7J3FP9LC');
//     var secretKey = config.get('JOARTEJWKARRBHUVNBHNQDJYVWOMONRI');
//     var vnpUrl = config.get('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
//     var returnUrl = config.get('http://localhost:3000/home');

//     var date = new Date();

//     var createDate = dateFormat(date, 'yyyymmddHHmmss');
//     var orderId = dateFormat(date, 'HHmmss');
//     var amount = "10000";
//     var bankCode = 'NCB';

//     var orderInfo = 'Thanh toan hoa don';
//     // var orderType = req.body.orderType;
//     var locale = req.body.language;
//     if (locale === null || locale === '') {
//         locale = 'vn';
//     }
//     var currCode = 'VND';
//     var vnp_Params = {};
//     vnp_Params['vnp_Version'] = '2.1.0';
//     vnp_Params['vnp_Command'] = 'pay';
//     vnp_Params['vnp_TmnCode'] = tmnCode;
//     // vnp_Params['vnp_Merchant'] = ''
//     vnp_Params['vnp_Locale'] = locale;
//     vnp_Params['vnp_CurrCode'] = currCode;
//     vnp_Params['vnp_TxnRef'] = '7';
//     vnp_Params['vnp_OrderInfo'] = orderInfo;
//     // vnp_Params['vnp_OrderType'] = orderType;
//     vnp_Params['vnp_Amount'] = amount * 100;
//     vnp_Params['vnp_ReturnUrl'] = returnUrl;
//     vnp_Params['vnp_IpAddr'] = ipAddr;
//     vnp_Params['vnp_CreateDate'] = createDate;
//     if (bankCode !== null && bankCode !== '') {
//         vnp_Params['vnp_BankCode'] = bankCode;
//     }

//     vnp_Params = sortObject(vnp_Params);

//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
//     vnp_Params['vnp_SecureHash'] = signed;
//     vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

//     res.redirect(vnpUrl)
// });
// // Vui lòng tham khảo thêm tại code demo




// var $ = require('jquery');

router.get('/', function (req, res, next) {
    res.render('orderlist', { title: 'Danh sách đơn hàng' })
});

router.get('/create_payment_url', function (req, res, next) {

    var dateFormat = require('dateformat');
    var date = new Date();

    var desc = 'Thanh toan don hang thoi gian: ' + dateFormat(date, 'yyyy-mm-dd HH:mm:ss');
    res.render('order', { title: 'Tạo mới đơn hàng', amount: 10000, description: desc })
});

router.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var config = require('config');
    var dateFormat = require('dateformat');


    var tmnCode = config.get('7J3FP9LC');
    var secretKey = config.get('JOARTEJWKARRBHUVNBHNQDJYVWOMONRI');
    var vnpUrl = config.get('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
    var returnUrl = config.get('http://localhost:3000/home');

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
});

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

let getEventService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let event = await db.khuyen_mai.findAll({
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
                data: event

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

let getFoodService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let food = await db.thuc_an.findAll(
                // {
                //     where: { tinh_tpId: tinh_tpId }
                // }
            );
            res.errCode = 0;
            res.data = food;
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

let getShowtimeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let showtime = await db.suat_chieu.findAll();
            res.errCode = 0;
            res.data = showtime;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

let getMovieFormatService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let movieFormat = await db.dinh_dang_chieu.findAll();
            res.errCode = 0;
            res.data = movieFormat;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

let getPaymentMethodsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let paymentMethods = await db.pt_thanhtoan.findAll();
            res.errCode = 0;
            res.data = paymentMethods;
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

let createShowtimeDetailService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrShowtime || !data.movieId || !data.provinceId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc',

                })
                console.log('check provinceId: ', provinceId);
            } else {
                let showtime = data.arrShowtime;
                let existing = await db.suat_chieu_phim.findAll(
                    {
                        where: { movieId: data.movieId, provinceId: data.provinceId, date: data.formatedDate },
                        attributes: ['date', 'movieId', 'provinceId'],
                        raw: true
                    },

                );

                // if (existing && existing.length > 0) {
                //     existing = existing.map(item => {
                //         item.date = new Date(item.date).getTime();
                //         return item;
                //     })
                // }

                let toCreate = _.differenceWith(showtime, existing, (a, b) => {
                    return +a.date === +b.date && a.provinceId === b.provinceId;
                })

                if (toCreate && toCreate.length > 0) {
                    await db.suat_chieu_phim.bulkCreate(toCreate)
                }
                console.log('data send: ', data);
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

// let getShowtimeByDateService = (movieId, provinceId, date) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!movieId || !provinceId || !date) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Thiếu các tham số bắt buộc'
//                 })
//             } else {
//                 let data = await db.suat_chieu_phim.findAll({
//                     where: {
//                         movieId: movieId,
//                         provinceId: provinceId,
//                         date: date
//                     }
//                 })

//                 if (!data) data = [];
//                 resolve({
//                     errCode: 0,
//                     data: data
//                 })
//             }

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let getShowtimeByDateService = (movieId, provinceId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!movieId || !provinceId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.suat_chieu_phim.findAll({
                    where: {
                        movieId: movieId,
                        provinceId: provinceId,
                        date: date
                    },
                    include: [
                        { model: db.dinh_dang_chieu, as: 'movieFormatData', attributes: ['ten_ddc'] },
                        { model: db.rap, as: 'theaterData', attributes: ['ten_rap'] },
                    ],
                    raw: false,
                    nest: true

                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

// let getMovieFormatByIdService = (movieId, provinceId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!movieId || !provinceId) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Thiếu các tham số bắt buộc'
//                 })
//             } else {
//                 let data = await db.dinh_dang_chieu.findOne({
//                     where: { id: theaterId }
//                     // raw: false
//                 })

//                 if (!data) data = [];
//                 resolve({
//                     errCode: 0,
//                     data: data
//                 })
//             }

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let getMovieFormatByIdService = (movieId, provinceId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!movieId || !provinceId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.suat_chieu_phim.findOne({
                    where: {
                        movieId: movieId,
                        provinceId: provinceId,
                        date: date
                    },
                    include: [
                        { model: db.dinh_dang_chieu, as: 'movieFormatData', attributes: ['ten_ddc'] },
                        { model: db.rap, as: 'theaterData', attributes: ['ten_rap'] },
                    ],
                    raw: false,
                    nest: true
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getSeatByCinemaRoomIdService = (cinemaRoomId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!cinemaRoomId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.ghe.findAll({
                    where: {
                        id_phong_chieu: cinemaRoomId,
                        // id_loai_ghe: '1'
                    },
                    include: [
                        { model: db.loai_ghe, as: 'seatTypeData', attributes: ['ten_loai_ghe', 'gia_tien'] },
                        { model: db.phong_chieu, as: 'cinemaRoomData', attributes: ['so_phong'] },
                    ],
                    raw: false,
                    nest: true
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getSeatByCinemaRoomIdServiceVIP = (cinemaRoomId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!cinemaRoomId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.ghe.findAll({
                    where: {
                        id_phong_chieu: cinemaRoomId,
                        id_loai_ghe: '2'
                    },
                    include: [
                        { model: db.loai_ghe, as: 'seatTypeData', attributes: ['ten_loai_ghe'] },
                        { model: db.phong_chieu, as: 'cinemaRoomData', attributes: ['so_phong'] },
                    ],
                    raw: false,
                    nest: true
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getTheaterByIdService = (theaterId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!theaterId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.rap.findOne({
                    where: { id: theaterId }
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getMovieByIdService = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!movieId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.Phim.findOne({
                    where: { id: movieId }
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getMemberByIdTKService = (idTK) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idTK) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.thanh_vien.findOne({
                    where: { id_tk: idTK },
                    include: [
                        { model: db.loai_thanhvien, as: 'loai_tv', attributes: ['ten_loai_tv'] },

                    ],
                    raw: false,
                    nest: true
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getTicketByIdTVService = (id_tv) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id_tv) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.ve_ban.findAll({
                    where: {
                        id_tv: id_tv,
                        trang_thai_ve: '1'
                    },
                    // include: [
                    //     {
                    //         model: db.ct_hd_ve, as: 'ticketData', attributes: ['id', 'id_ghe', 'id_suat_chieu', 'don_gia_ve'],
                    //         include: [
                    //             { model: db.ghe, as: 'seatId', attributes: ['ten_ghe'] },
                    //             {
                    //                 model: db.suat_chieu_phim, as: 'suatChieuId', attributes: ['movieId', 'showTime'],

                    //                 include: [
                    //                     { model: db.Phim, as: 'movieData', attributes: ['ten_phim'] }
                    //                 ]

                    //             },
                    //         ],
                    //         raw: false,
                    //         nest: true
                    //     },
                    // ]
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailTicketByIdTicketService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.ct_hd_ve.findAll({
                    where: { id: id },
                    include: [
                        { model: db.ve_ban, as: 'ticketData', attributes: ['ngay_ban'] },
                        { model: db.ghe, as: 'seatId', attributes: ['ten_ghe'] },
                        {
                            model: db.suat_chieu_phim, as: 'suatChieuId', attributes: ['movieId', 'showTime'],

                            include: [
                                { model: db.Phim, as: 'movieData', attributes: ['ten_phim'] },
                                { model: db.rap, as: 'theaterData', attributes: ['ten_rap'] }
                            ]

                        },
                    ],
                    raw: false,
                    nest: true
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}



let getPaymentByIdService = (paymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!paymentId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.pt_thanhtoan.findOne({
                    where: { id: paymentId }
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getRatingByIdMovieService = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!movieId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.danh_gia.findAll({
                    where: { id_phim: movieId },
                    include: [
                        { model: db.thanh_vien, as: 'memberData', attributes: ['ten_tv'] },

                    ],
                    order: [
                        ['id', 'DESC']],
                    raw: false,
                    nest: true
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


let getEmailByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let data = await db.thanh_vien.findOne({
                    where: { id: inputId }
                    // raw: false
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let CreateNewTicket = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailReceiver = data.email;
            let name = data.name;
            let date = data.dateBooking;
            let movieName = data.movieNameBooking;
            let showTime = data.showTimeBooking;
            let theater = data.theaterBooking;
            let seat = data.arrSeat;
            let paymentName = data.paymentNameBooking;
            let food = data.arrFoodSelected;



            await emailService.sendSimpleEmail({
                receiverEmail: emailReceiver,
                name: name,
                date: date,
                movieName: movieName,
                showTime: showTime,
                theater: theater,
                seat: seat.map(item => {
                    return item;
                }),
                paymentName: paymentName,
                food: food.map(item => {
                    return item;
                })
            })
            console.log(emailReceiver)
            await db.ve_ban.create({
                id_pttt: data.id_pttt,
                id_tv: data.id_tv,
                id_km: data.id_km,
                ngay_ban: data.ngay_ban,
                giam_gia_ve: data.giam_gia_ve,
                trang_thai_ve: data.trang_thai_ve

            }).then(async result => {

                let CTHDV = data.arrCTHDV;
                if (CTHDV && CTHDV.length > 0) {
                    CTHDV = CTHDV.map(item => {
                        item.id = result.id;
                        item.so_luong_ve = CTHDV.length;
                        return item;
                    })
                }
                await db.ct_hd_ve.bulkCreate(CTHDV)
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let CreateNewBillFood = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let emailReceiver = data.email;
            // let name = data.name;
            // let date = data.dateBooking;
            // let movieName = data.movieNameBooking;
            // let showTime = data.showTimeBooking;
            // let theater = data.theaterBooking;
            // let seat = data.arrSeat;
            // await emailService.sendSimpleEmail({
            //     receiverEmail: emailReceiver,
            //     name: name,
            //     date: date,
            //     movieName: movieName,
            //     showTime: showTime,
            //     theater: theater,
            //     seat: seat.map(item => {
            //         return item;
            //     })
            // })
            // console.log(emailReceiver)
            await db.hoa_don_thuc_an.create({
                id_pttt: data.id_pttt,
                id_tv: data.id_tv,
                id_km: data.id_km,
                ngay_ban: data.ngay_ban,
                giam_gia_hd: data.giam_gia_hd,
                trang_thai_hd: data.trang_thai_hd

            }).then(async result => {

                let CTHDTA = data.arrFood;
                if (CTHDTA && CTHDTA.length > 0) {
                    CTHDTA = CTHDTA.map(item => {
                        item.id = result.id;
                        return item;
                    })
                }
                await db.cthd_thucan.bulkCreate(CTHDTA)
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let CreateNewDetailTicket = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ct_hd_ve.create({
                id: data.id,
                id_ghe: data.id_ghe,
                id_suat_chieu: data.id_suat_chieu,
                so_luong_ve: data.so_luong_ve,
                don_gia_ve: data.don_gia_ve

                // id_ghe: '1',
                // id_suat_chieu: '1',
                // so_luong_ve: '1',
                // don_gia_ve: '60000'

            })
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

async function createPayment(req, res, next) {
    let vnpay = new VNPay({
        secretKey: 'JOARTEJWKARRBHUVNBHNQDJYVWOMONRI',
        returnUrl: 'http://localhost:3000/login-membership',
        merchantCode: '7J3FP9LC',
        hashAlgorithm: 'sha256',
        // vnpVersion: '2.0.1'
    });
    // require pay 10000 VND.
    console.log('check data:', req.body)
    let id = req.body.transactionRef;
    let orderType = req.body.orderType;
    let amount = req.body.amount;
    console.log('check data id:', id);
    console.log('check data orderInfo:', orderType);
    console.log('check data amount:', amount);

    // let payURL = await vnpay.genPayURL({
    //     transactionRef: '54',
    //     orderInfo: 'Thanh toan hoa don dich vu',
    //     orderType: '100000',
    //     amount: 100000,



    let payURL = await vnpay.genPayURL({
        transactionRef: id,
        orderInfo: 'Thanh toan hoa don dich vu',
        orderType: '100000',
        amount: amount,



        //     // bankCode: 'NCB'
        // });

    });
    res.send(payURL)
}





module.exports = {
    getMovieNowShowingService: getMovieNowShowingService,
    getAllMovie: getAllMovie,
    getMovieNowShowingById: getMovieNowShowingById,
    getProvinceService: getProvinceService,
    getTheaterService: getTheaterService,
    getCinemaRoomService: getCinemaRoomService,
    getShowtimeService: getShowtimeService,
    getMovieFormatService: getMovieFormatService,
    createShowtimeDetailService: createShowtimeDetailService,
    getShowtimeByDateService: getShowtimeByDateService,
    getMovieFormatByIdService: getMovieFormatByIdService,
    getTheaterByIdService: getTheaterByIdService,
    getSeatByCinemaRoomIdService: getSeatByCinemaRoomIdService,
    getSeatByCinemaRoomIdServiceVIP: getSeatByCinemaRoomIdServiceVIP,
    getEventService: getEventService,
    getPaymentMethodsService: getPaymentMethodsService,
    getMovieByIdService: getMovieByIdService,
    CreateNewTicket: CreateNewTicket,
    CreateNewDetailTicket: CreateNewDetailTicket,
    getEmailByIdService: getEmailByIdService,
    getFoodService: getFoodService,
    getPaymentByIdService: getPaymentByIdService,
    CreateNewBillFood: CreateNewBillFood,
    getTicketByIdTVService: getTicketByIdTVService,
    getDetailTicketByIdTicketService: getDetailTicketByIdTicketService,
    createPayment: createPayment,
    getMemberByIdTKService: getMemberByIdTKService,
    getRatingByIdMovieService: getRatingByIdMovieService
}