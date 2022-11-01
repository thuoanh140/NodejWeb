import { response } from "express";
import userServices from "../services/userServices"

let handleLogin = async (req, res) => {
    let ten_tk = req.body.ten_tk;
    let mat_khau = req.body.mat_khau;

    if (!ten_tk || !mat_khau) {
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn chưa nhập tên đăng nhập hoặc mật khẩu!'
        })
    }

    let userData = await userServices.handleUserLogin(ten_tk, mat_khau);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}

let handleGetAllStaff = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Thiếu các thông số bắt buộc!',
            staffs: []
        })
    }

    let staffs = await userServices.getAllStaff(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        staffs
    })
}



let handleCreateNewStaff = async (req, res) => {
    let message = await userServices.CreateNewStaff(req.body);
    return res.status(200).json(message);
}



let handleCreateNewMovie = async (req, res) => {
    let message = await userServices.CreateNewMovie(req.body);
    return res.status(200).json(message);
}

let handleCreateNewFood = async (req, res) => {
    let message = await userServices.CreateNewFood(req.body);
    return res.status(200).json(message);
}

let handleCreateNewEvent = async (req, res) => {
    let message = await userServices.CreateNewEvent(req.body);
    return res.status(200).json(message);
}

let handleRegisterNow = async (req, res) => {
    let message = await userServices.RegisterNow(req.body);
    return res.status(200).json(message);
}

let handleCreateNewRating = async (req, res) => {
    let message = await userServices.CreateNewRating(req.body);
    return res.status(200).json(message);
}

let handleEditStaff = async (req, res) => {
    let data = req.body;
    let message = await userServices.updateStaff(data);
    return res.status(200).json(message)
}

let handleEditMember = async (req, res) => {
    let data = req.body;
    let message = await userServices.updateMember(data);
    return res.status(200).json(message)
}

let handleCancelTicket = async (req, res) => {
    // let data = req.body.id;
    let message = await userServices.cancelTicket(req.query.id);
    return res.status(200).json(message)
}

let handleDeleteStaff = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Thiếu các thông số bắt buộc!'
        })
    }
    let message = await userServices.deleteStaff(req.body.id);
    return res.status(200).json(message)
}

let handleDeleteTicket = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Thiếu các thông số bắt buộc!'
        })
    }
    let message = await userServices.deleteTicket(req.body.id);
    return res.status(200).json(message)
}

let getMovie = async (req, res) => {
    try {
        let data = await userServices.getMovieService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllTicket = async (req, res) => {
    try {
        let data = await userServices.getAllTicketService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin ve: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let searchTicket = async (req, res) => {
    try {
        let data = await userServices.searchTicketService(req.query);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin ve: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getGenre = async (req, res) => {
    try {
        let data = await userServices.getGenreService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin thể loại: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

// let getNation = async (req, res) => {
//     try {
//         let data = await userServices.getNationService();
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log('Có lỗi khi lấy thông tin quốc gia: ', e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

// let getDirector = async (req, res) => {
//     try {
//         let data = await userServices.getDirectorService();
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log('Có lỗi khi lấy thông tin đạo diễn: ', e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

// let getCast = async (req, res) => {
//     try {
//         let data = await userServices.getCastService();
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log('Có lỗi khi lấy thông tin diễn viên: ', e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

let handleGetTicketLimit = async (req, res) => {
    try {
        let data = await userServices.handleGetTicketLimitService(req.query.limit, req.query.page);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin ve: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllStaff: handleGetAllStaff,
    handleCreateNewStaff: handleCreateNewStaff,
    handleEditStaff: handleEditStaff,
    handleDeleteStaff: handleDeleteStaff,
    getMovie: getMovie,
    getGenre: getGenre,
    // getNation: getNation,
    // getDirector: getDirector,
    // getCast: getCast,
    handleCreateNewMovie: handleCreateNewMovie,
    handleCreateNewEvent: handleCreateNewEvent,
    handleCreateNewFood: handleCreateNewFood,
    handleCancelTicket: handleCancelTicket,
    handleCreateNewRating: handleCreateNewRating,
    getAllTicket: getAllTicket,
    handleDeleteTicket: handleDeleteTicket,
    searchTicket: searchTicket,
    handleGetTicketLimit: handleGetTicketLimit,
    handleRegisterNow: handleRegisterNow,
    handleEditMember: handleEditMember

}