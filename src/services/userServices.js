import db from "../models/index"
import bcrypt from 'bcryptjs';

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
}