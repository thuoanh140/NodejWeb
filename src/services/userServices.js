import db from "../models/index"
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (ten_tk, mat_khau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkTenTK(ten_tk);
            if (isExist) {
                //user aready exist
                let user = await db.Tai_Khoan.findOne({
                    where: { ten_tk: ten_tk },
                    raw: true
                });
                if (user) {
                    //compare password
                    let check = bcrypt.compareSync(mat_khau, user.mat_khau);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.mat_khau;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Không tìm thấy tên tài khoản';
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = 'Tên tài khoản không tồn tại trong hệ thống!';

            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}


let checkTenTK = (userTentk) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Tai_Khoan.findOne({
                where: { ten_tk: userTentk }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Nhan_Vien.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllStaff = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staffs = '';
            if (staffId === 'ALL') {
                staffs = await db.Nhan_Vien.findAll({

                })
            }
            if (staffId && staffId !== 'ALL') {
                staffs = await db.Nhan_Vien.findOne({
                    where: { id: staffId }
                })
            }

            resolve(staffs)
        } catch (e) {
            reject(e);
        }
    })
}

let CreateNewStaff = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email bạn nhập vào đã tồn tại trong hệ thống. Vui lòng nhập một email khác!'
                })
            } else {
                await db.Nhan_Vien.create({
                    ten_nv: data.ten_nv,
                    ngay_sinh: data.ngay_sinh,
                    gioi_tinh: data.gioi_tinh == '1' ? true : false,
                    email: data.email,
                    sdt: data.sdt,
                    dia_chi: data.dia_chi
                })
            }

            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}


let CreateNewMovie = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Phim.create({
                ten_phim: data.ten_phim,
                ngay_kc: data.ngay_kc,
                thoi_luong: data.thoi_luong,
                gh_tuoi: data.gh_tuoi,
                tom_tat: data.tom_tat,
                ngon_ngu: data.ngon_ngu,
                quoc_gia: data.quoc_gia,
                dao_dien: data.dao_dien,
                dien_vien: data.dien_vien,
                poster: data.poster,
                ten_loai: [{
                    ten_loai: data.ten_loai,
                }]
            }, {
                include: db.The_Loai_Phim
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

let CreateNewFood = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.thuc_an.create({
                ten_ta: data.ten_ta,
                gia: data.gia,
                so_luong: data.so_luong,
                ghi_chu: data.ghi_chu,
                anh: data.anh

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

let CreateNewEvent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.khuyen_mai.create({
                ten_km: data.ten_km,
                thoi_gian_kt: data.thoi_gian_kt,
                giam_gia_hd: data.giam_gia_hd,
                anh_event: data.anh_event

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

let CreateNewRating = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.danh_gia.create({
                id_tv: data.id_tv,
                diem_dg: data.diem_dg,
                noi_dung: data.noi_dung,
                ngay_dg: data.ngay_dg,
                id_phim: data.id_phim

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

let ReportRating = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.bao_xau_danh_gia.create({
                noi_dung: data.noi_dung,
                id_dg: data.id_dg,
                id_tv: data.id_tv
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

let hashUserPassword = (mat_khau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(mat_khau, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }


    })
}

let RegisterNow = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.thanh_vien.create({
                id_loai_tv: 1,
                ten_tv: data.ten_tv,
                ngay_sinh: data.ngay_sinh,
                email: data.email,
                sdt: data.sdt,
                gioi_tinh: data.gioi_tinh

            }).then(async result => {
                let hashPasswordFromBcrypt = await hashUserPassword(data.mat_khau)
                await db.Tai_Khoan.create({
                    ten_tk: data.ten_tk,
                    mat_khau: hashPasswordFromBcrypt,
                    role_id: 3,
                    id_tv: result.id
                })
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

let deleteStaff = (staffId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Nhan_Vien.findOne({
            where: { id: staffId }
        })

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'Nhân viên không tồn tại!'
            })
        }

        await db.Nhan_Vien.destroy({
            where: { id: staffId }
        })
        resolve({
            errCode: 0,
            Message: 'Xóa thành công'
        })
    })
}

let deleteTicket = (ticketId) => {
    return new Promise(async (resolve, reject) => {
        let ticket = await db.ct_hd_ve.findOne({
            where: { id: ticketId }
        })

        if (!ticket) {
            resolve({
                errCode: 2,
                errMessage: 'Ve không tồn tại!'
            })
        }

        await db.ct_hd_ve.destroy({
            where: { id: ticketId }
        })
        resolve({
            errCode: 0,
            Message: 'Xóa thành công'
        })
    })
}

let deleteRating = (ratingId) => {
    return new Promise(async (resolve, reject) => {
        let rating = await db.danh_gia.findOne({
            where: { id: ratingId }
        })

        if (!rating) {
            resolve({
                errCode: 2,
                errMessage: 'Đánh giá không tồn tại!'
            })
        }

        await db.danh_gia.destroy({
            where: { id: ratingId }
        })
        resolve({
            errCode: 0,
            Message: 'Xóa thành công'
        })
    })
}


let deleteReport = (reportId) => {
    return new Promise(async (resolve, reject) => {
        let report = await db.bao_xau_danh_gia.findAll({
            where: { id_dg: reportId }
        })

        if (!report) {
            resolve({
                errCode: 2,
                errMessage: 'Đánh giá không tồn tại!'
            })
        }

        await db.bao_xau_danh_gia.destroy({
            where: { id_dg: reportId }
        })
        resolve({
            errCode: 0,
            Message: 'Xóa thành công'
        })
    })
}


let updateStaff = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu các tham số bắt buộc!'
                })
            }
            let staff = await db.Nhan_Vien.findOne({
                where: { id: data.id },
                raw: false
            })
            if (staff) {
                staff.ten_nv = data.ten_nv;
                staff.ngay_sinh = data.ngay_sinh;
                staff.dia_chi = data.dia_chi;
                staff.gioi_tinh = data.gioi_tinh;

                await staff.save();
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy người dùng!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateMember = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu các tham số bắt buộc!'
                })
            }
            let member = await db.thanh_vien.findOne({
                where: { id: data.id },
                raw: false
            })
            if (member) {
                member.ten_tv = data.ten_nv;
                member.ngay_sinh = data.ngay_sinh;
                member.sdt = data.sdt;
                member.email = data.email;
                member.gioi_tinh = data.gioi_tinh;

                await member.save();
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy người dùng!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let cancelTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu các tham số bắt buộc!'
                })
            }
            let ticketCancel = await db.ve_ban.findOne({
                where: { id: id },
                raw: false

            })
            if (ticketCancel) {
                ticketCancel.trang_thai_ve = false;
                await ticketCancel.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy vé!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}



let getMovieService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc!'
                })

            } else {
                let res = {};
                let movie = await db.Phim.findAll({
                    where: { id: inputId }
                });
                res.errCode = 0;
                res.data = movie;
                resolve(res)
            }


        } catch (e) {
            reject(e);
        }
    })
}

let getGenreService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let genre = await db.The_Loai_Phim.findAll();
            res.errCode = 0;
            res.data = genre;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllTicketService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let ticket = await db.ct_hd_ve.findAll({
                // offset: 5, limit: 5,
                include: [

                    {
                        model: db.ve_ban, as: 'ticketData', attributes: ['id_pttt', 'id_tv', 'id_km', 'ngay_ban', 'giam_gia_ve', 'trang_thai_ve'],
                        include:
                            [
                                { model: db.pt_thanhtoan, as: 'paymentData', attributes: ['ten_pttt'] }
                            ]
                    },
                    {
                        model: db.ghe, as: 'seatId', attributes: ['ten_ghe'],
                        include: [
                            {
                                model: db.phong_chieu, as: 'cinemaRoomData', attributes: ['so_phong'],
                                include: [
                                    { model: db.rap, as: 'rapData', attributes: ['ten_rap'] }
                                ]
                            },
                        ]
                    },
                    {
                        model: db.suat_chieu_phim, as: 'suatChieuId', attributes: ['movieId', 'showTime'],

                        include: [
                            { model: db.Phim, as: 'movieData', attributes: ['ten_phim'] }
                        ]
                    },




                ],
                raw: false,
                nest: true
            });
            res.errCode = 0;
            res.data = ticket;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetTicketLimitService = (limit = 20, page = 1) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit || !page) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các tham số bắt buộc'
                })
            } else {
                let res = {};
                let ticket = await db.ct_hd_ve.findAndCountAll({
                    order: [["id", "DESC"]],
                    offset: parseInt(page - 1) * limit,
                    limit: parseInt(limit),
                    // order: [["id", "DESC"]],
                    include: [
                        {
                            model: db.ve_ban, as: 'ticketData', attributes: ['id_pttt', 'id_tv', 'id_km', 'ngay_ban', 'giam_gia_ve', 'trang_thai_ve'],
                            include:
                                [
                                    { model: db.pt_thanhtoan, as: 'paymentData', attributes: ['ten_pttt'] }
                                ]
                        },
                        {
                            model: db.ghe, as: 'seatId', attributes: ['ten_ghe'],
                            include: [
                                {
                                    model: db.phong_chieu, as: 'cinemaRoomData', attributes: ['so_phong'],
                                    include: [
                                        { model: db.rap, as: 'rapData', attributes: ['ten_rap'] }
                                    ]
                                },
                            ]
                        },
                        {
                            model: db.suat_chieu_phim, as: 'suatChieuId', attributes: ['movieId', 'showTime'],

                            include: [
                                { model: db.Phim, as: 'movieData', attributes: ['ten_phim'] }
                            ]
                        },




                    ],
                    raw: false,
                    nest: true
                });
                res.errCode = 0;
                res.data = ticket;
                resolve(res)
            }

        } catch (e) {
            reject(e);
        }
    })
}

let searchTicketService = (condition) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let ticket = await db.ct_hd_ve.findAll({
                where: condition
                ,
                include: [

                    {
                        model: db.ve_ban, as: 'ticketData', attributes: ['id_pttt', 'id_tv', 'id_km', 'ngay_ban', 'giam_gia_ve', 'trang_thai_ve'],
                        include:
                            [
                                { model: db.pt_thanhtoan, as: 'paymentData', attributes: ['ten_pttt'] }
                            ]
                    },
                    {
                        model: db.ghe, as: 'seatId', attributes: ['ten_ghe'],
                        include: [
                            {
                                model: db.phong_chieu, as: 'cinemaRoomData', attributes: ['so_phong'],
                                include: [
                                    { model: db.rap, as: 'rapData', attributes: ['ten_rap'] }
                                ]
                            },
                        ]
                    },
                    {
                        model: db.suat_chieu_phim, as: 'suatChieuId', attributes: ['movieId', 'showTime'],

                        include: [
                            { model: db.Phim, as: 'movieData', attributes: ['ten_phim'] }
                        ]
                    },




                ],
                raw: false,
                nest: true
            });
            res.errCode = 0;
            res.data = ticket;
            resolve(res)
        } catch (e) {
            reject(e);
        }
    })
}



// let getNationService = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let res = {};
//             let nation = await db.Quoc_Gia.findAll();
//             res.errCode = 0;
//             res.data = nation;
//             resolve(res)
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let getDirectorService = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let res = {};
//             let director = await db.Dao_Dien.findAll();
//             res.errCode = 0;
//             res.data = director;
//             resolve(res)
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let getCastService = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let res = {};
//             let cast = await db.Dien_Vien.findAll();
//             res.errCode = 0;
//             res.data = cast;
//             resolve(res)
//         } catch (e) {
//             reject(e);
//         }
//     })
// }




module.exports = {
    handleUserLogin: handleUserLogin,
    checkTenTK: checkTenTK,
    getAllStaff: getAllStaff,
    CreateNewStaff: CreateNewStaff,
    deleteStaff: deleteStaff,
    updateStaff: updateStaff,
    getMovieService: getMovieService,
    getGenreService: getGenreService,
    // getNationService: getNationService,
    // getCastService: getCastService,
    // getDirectorService: getDirectorService,
    CreateNewMovie: CreateNewMovie,
    CreateNewEvent: CreateNewEvent,
    CreateNewFood: CreateNewFood,
    cancelTicket: cancelTicket,
    CreateNewRating: CreateNewRating,
    getAllTicketService: getAllTicketService,
    deleteTicket: deleteTicket,
    searchTicketService: searchTicketService,
    handleGetTicketLimitService: handleGetTicketLimitService,
    RegisterNow: RegisterNow,
    updateMember: updateMember,
    ReportRating: ReportRating,
    deleteRating: deleteRating,
    deleteReport: deleteReport
}