import db from '../models/index';
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------------');
        console.log(data);
        console.log('---------------');
        return res.render("homepage.ejs", { data: JSON.stringify(data) });

    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewStaff(req.body);
    console.log(message)
    return res.send('Thêm nhân viên thành công!');
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.showAllStaff();
    console.log('-----------------');
    console.log(data);
    console.log('-----------------');
    return res.render('displayStaff.ejs', {
        dataTable: data
    })
}

let getEditStaff = async (req, res) => {
    let staffId = req.query.id;
    if (staffId) {
        let staffData = await CRUDService.getStaffInfoById(staffId);
        return res.render('editStaff.ejs', {
            staff: staffData
        });
    } else {
        return res.send('Không tìm thấy nhân viên!');
    }

}

let addAccount = (req, res) => {
    return res.render('addAccount.ejs')
}

let addedAccount = async (req, res) => {
    let message1 = await CRUDService.createNewAccount(req.body);
    console.log(message1)
    return res.send('Tạo tài khoản thành công')
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allStaff = await CRUDService.updateStaffData(data);
    return res.render('displayStaff.ejs', {
        dataTable: allStaff
    })
}

let deleteStaff = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteStaffById(id);
        return res.send('Xóa nhân viên thành công!');
    } else {
        return res.send('Không tìm thấy nhân viên!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditStaff: getEditStaff,
    putCRUD: putCRUD,
    deleteStaff: deleteStaff,
    addAccount: addAccount,
    addedAccount: addedAccount,
}