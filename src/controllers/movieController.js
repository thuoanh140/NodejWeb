import movieService from '../services/movieService'
import { response } from "express";

let getMovieNowShowing = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await movieService.getMovieNowShowingService(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Lỗi từ server'
        })
    }
}

let getMovieComingSoon = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await movieService.getMovieComingSoonService(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Lỗi từ server'
        })
    }
}

let getEvent = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await movieService.getEventService(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Lỗi từ server'
        })
    }
}



let handleGetMovieDetail = async (req, res) => {
    try {
        let data = await movieService.getMovieNowShowingById(req.query.ten_phim);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy chi tiết phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleGetAllMovie = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Thiếu các thông số bắt buộc!',
            movies: []
        })
    }

    let movies = await movieService.getAllMovie(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        movies
    })
}

let getProvince = async (req, res) => {
    try {
        let data = await movieService.getProvinceService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin tỉnh/tp: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getReport = async (req, res) => {
    try {
        let data = await movieService.getReportService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin report: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getTheater = async (req, res) => {
    try {
        let data = await movieService.getTheaterService(req.query.tinh_tpId);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin rạp: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getFood = async (req, res) => {
    try {
        let data = await movieService.getFoodService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin thuc an: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getPaymentMethods = async (req, res) => {
    try {
        let data = await movieService.getPaymentMethodsService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin PTTT: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getStateMovie = async (req, res) => {
    try {
        let data = await movieService.getStateMovieService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin trang thai phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getCinemaRoom = async (req, res) => {
    try {
        let data = await movieService.getCinemaRoomService(req.query.rapId);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phòng chiếu: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getShowtime = async (req, res) => {
    try {
        let data = await movieService.getShowtimeService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin suat chieu: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getMovieFormat = async (req, res) => {
    try {
        let data = await movieService.getMovieFormatService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin dinh dang chieu: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getMovieFormatById = async (req, res) => {
    try {
        let data = await movieService.getMovieFormatByIdService(req.query.movieId, req.query.provinceId, req.query.date);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin dinh dang chieu: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getTheaterById = async (req, res) => {
    try {
        let data = await movieService.getTheaterByIdService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin rap: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getMovieById = async (req, res) => {
    try {
        let data = await movieService.getMovieByIdService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getMemberByIdTK = async (req, res) => {
    try {
        let data = await movieService.getMemberByIdTKService(req.query.id_tk);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin thanh vien: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getTicketByIdTV = async (req, res) => {
    try {
        let data = await movieService.getTicketByIdTVService(req.query.id_tv);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getTicketUnpaidByIdTV = async (req, res) => {
    try {
        let data = await movieService.getTicketUnpaidByIdTVService(req.query.id_tv);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


let getTicketUnPaid = async (req, res) => {
    try {
        let data = await movieService.getTicketUnPaidService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getBillFoodUnPaid = async (req, res) => {
    try {
        let data = await movieService.getBillFoodUnPaidService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getIdSeatByIdShowtime = async (req, res) => {
    try {
        let data = await movieService.getIdSeatByIdShowtimeService(req.query.id_suat_chieu);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin id_ghe: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailTicketByIdTicket = async (req, res) => {
    try {
        let data = await movieService.getDetailTicketByIdTicketService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


let getDetailBillFoodByIdBillFood = async (req, res) => {
    try {
        let data = await movieService.getDetailBillFoodByIdBillFoodService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phim: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getPaymentById = async (req, res) => {
    try {
        let data = await movieService.getPaymentByIdService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin PTTT: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRatingByIdMovie = async (req, res) => {
    try {
        let data = await movieService.getRatingByIdMovieService(req.query.id_phim);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin danh gia: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getEmailById = async (req, res) => {
    try {
        let data = await movieService.getEmailByIdService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin email: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let createTicket = async (req, res) => {
    let message = await movieService.CreateNewTicket(req.body);
    return res.status(200).json(message);
}

let createBillFood = async (req, res) => {
    let message = await movieService.CreateNewBillFood(req.body);
    return res.status(200).json(message);
}

let createDetailTicket = async (req, res) => {
    let message = await movieService.CreateNewDetailTicket(req.body);
    return res.status(200).json(message);
}

let getSeatByCinemaRoomId = async (req, res) => {
    try {
        let data = await movieService.getSeatByCinemaRoomIdService(req.query.id_phong_chieu);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin ghe: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getSeatByCinemaRoomIdVIP = async (req, res) => {
    try {
        let data = await movieService.getSeatByCinemaRoomIdServiceVIP(req.query.id_phong_chieu);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin ghe: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let createShowtimeDetail = async (req, res) => {
    try {
        let infor = await movieService.createShowtimeDetailService(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

// let getShowtimeByDate = async (req, res) => {
//     try {
//         let infor = await movieService.getShowtimeByDateService(req.query.movieId, req.query.provinceId, req.query.date);
//         return res.status(200).json(infor)
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

let getShowtimeByDate = async (req, res) => {
    try {
        let infor = await movieService.getShowtimeByDateService(req.query.movieId, req.query.provinceId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRevenueByDate = async (req, res) => {
    try {
        let infor = await movieService.getRevenueByDateService(req.query.ngay_ban);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRevenueTheaterByDate = async (req, res) => {
    try {
        let infor = await movieService.getRevenueTheaterByDateService(req.query.ngay_ban);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRevenueMovie = async (req, res) => {
    try {
        let infor = await movieService.getRevenueMovieService();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRevenueFoodByTheater = async (req, res) => {
    try {
        let infor = await movieService.getRevenueFoodByTheaterService();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRevenueTheater = async (req, res) => {
    try {
        let infor = await movieService.getRevenueTheatereService();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRevenueFoodByDate = async (req, res) => {
    try {
        let infor = await movieService.getRevenueFoodByDateService(req.query.ngay_ban);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


let getRevenueFoodTheaterByDate = async (req, res) => {
    try {
        let infor = await movieService.getRevenueFoodTheaterByDateService(req.query.ngay_ban);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


module.exports = {
    getMovieNowShowing: getMovieNowShowing,
    handleGetAllMovie: handleGetAllMovie,
    handleGetMovieDetail: handleGetMovieDetail,
    getProvince: getProvince,
    getTheater: getTheater,
    getCinemaRoom: getCinemaRoom,
    getShowtime: getShowtime,
    getMovieFormat: getMovieFormat,
    createShowtimeDetail: createShowtimeDetail,
    getShowtimeByDate: getShowtimeByDate,
    getMovieFormatById: getMovieFormatById,
    getTheaterById: getTheaterById,
    getSeatByCinemaRoomId: getSeatByCinemaRoomId,
    getSeatByCinemaRoomIdVIP: getSeatByCinemaRoomIdVIP,
    getEvent: getEvent,
    getPaymentMethods: getPaymentMethods,
    getMovieById: getMovieById,
    createTicket: createTicket,
    createDetailTicket: createDetailTicket,
    getEmailById: getEmailById,
    getFood: getFood,
    getPaymentById: getPaymentById,
    createBillFood: createBillFood,
    getTicketByIdTV: getTicketByIdTV,
    getDetailTicketByIdTicket: getDetailTicketByIdTicket,
    getMemberByIdTK: getMemberByIdTK,
    getRatingByIdMovie: getRatingByIdMovie,
    getIdSeatByIdShowtime: getIdSeatByIdShowtime,
    getReport: getReport,
    getStateMovie: getStateMovie,
    getMovieComingSoon: getMovieComingSoon,
    getRevenueByDate: getRevenueByDate,
    getTicketUnpaidByIdTV: getTicketUnpaidByIdTV,
    getRevenueFoodByDate: getRevenueFoodByDate,
    getRevenueMovie: getRevenueMovie,
    getRevenueTheater: getRevenueTheater,
    getRevenueTheaterByDate: getRevenueTheaterByDate,
    getRevenueFoodByTheater: getRevenueFoodByTheater,
    getRevenueFoodTheaterByDate: getRevenueFoodTheaterByDate,
    getTicketUnPaid: getTicketUnPaid,
    getBillFoodUnPaid: getBillFoodUnPaid,
    getDetailBillFoodByIdBillFood: getDetailBillFoodByIdBillFood
}