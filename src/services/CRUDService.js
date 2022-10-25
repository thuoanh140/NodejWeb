import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewStaff = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Nhan_Vien.create({
                ten_nv: data.ten_nv,
                ngay_sinh: data.ngay_sinh,
                gioi_tinh: data.gioi_tinh == '1' ? true : false,
                email: data.email,
                sdt: data.sdt,
                dia_chi: data.dia_chi,
                anh_dai_dien: data.anh_dai_dien
            })
            resolve('ok! create a new staff succeed!')
        } catch (e) {
            reject(e)
        }
    })
}

let createNewAccount = async (dataAccount) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(dataAccount.mat_khau)
            await db.Tai_Khoan.create({
                ten_tk: dataAccount.ten_tk,
                mat_khau: hashPasswordFromBcrypt,
                id_tv: '1',

            })
            console.log(dataAccount)
            console.log(hashPasswordFromBcrypt)
            resolve('ok! create a new account succeed!')
        } catch (e) {
            reject(e)
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

let showAllStaff = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let staffs = db.Nhan_Vien.findAll({
                raw: true,
            });
            resolve(staffs)
        } catch (e) {
            reject(e);
        }
    })
}

let getStaffInfoById = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.Nhan_Vien.findOne({
                where: { id: staffId },
                raw: true,
            })

            if (staff) {
                resolve(staff);
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateStaffData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.Nhan_Vien.findOne({
                where: {
                    id: data.id
                }
            })
            if (staff) {
                staff.ten_nv = data.ten_nv;
                staff.ngay_sinh = data.ngay_sinh;
                staff.dia_chi = data.dia_chi;
                staff.anh_dai_dien = data.anh_dai_dien;
                staff.gioi_tinh = data.gioi_tinh;

                await staff.save();

                let allStaff = await db.Nhan_Vien.findAll();
                resolve(allStaff);
            }
            else {
                resolve()
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteStaffById = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.Nhan_Vien.findOne({
                where: { id: staffId }
            })

            if (staff) {
                await staff.destroy();
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewStaff: createNewStaff,
    createNewAccount: createNewAccount,
    showAllStaff: showAllStaff,
    getStaffInfoById: getStaffInfoById,
    deleteStaffById: deleteStaffById,
    updateStaffData: updateStaffData,
}