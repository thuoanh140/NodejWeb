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

let getTheater = async (req, res) => {
    try {
        let data = await movieService.getTheaterService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin rạp: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getCinemaRoom = async (req, res) => {
    try {
        let data = await movieService.getCinemaRoomService();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Có lỗi khi lấy thông tin phòng chiếu: ', e);
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
    getCinemaRoom: getCinemaRoom
}