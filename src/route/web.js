import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import movieController from '../controllers/movieController'
import movieService from '../services/movieService'

let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/getcrud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD);
    router.get('/viewCRUD', homeController.displayCRUD);
    router.get('/edit-staff', homeController.getEditStaff);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-staff', homeController.deleteStaff);
    router.get('/addAccount', homeController.addAccount);
    router.post('/addedAccount', homeController.addedAccount);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-staff', userController.handleGetAllStaff);
    router.post('/api/create-new-staff', userController.handleCreateNewStaff);
    router.put('/api/edit-staff', userController.handleEditStaff);
    // router.put('/api/edit-ticket', userController.handleEditS);
    router.put('/api/cancel-ticket', userController.handleCancelTicket);
    router.delete('/api/delete-staff', userController.handleDeleteStaff);
    router.delete('/api/delete-ticket', userController.handleDeleteTicket);

    router.get('/api/get-movie', userController.getMovie);
    router.get('/api/get-all-ticket', userController.getAllTicket);
    router.get('/api/search-ticket', userController.searchTicket);
    router.get('/api/get-genre', userController.getGenre);
    router.get('/api/get-province', movieController.getProvince);
    router.get('/api/get-showtime', movieController.getShowtime);
    router.get('/api/get-movie-format', movieController.getMovieFormat);
    router.get('/api/get-theater', movieController.getTheater);
    router.get('/api/get-food', movieController.getFood);
    router.get('/api/get-cinema-room', movieController.getCinemaRoom);
    router.post('/api/create-new-movie', userController.handleCreateNewMovie);
    router.post('/api/create-new-food', userController.handleCreateNewFood);
    router.post('/api/create-new-event', userController.handleCreateNewEvent);
    router.post('/api/create-new-rating', userController.handleCreateNewRating);
    router.post('/create_payment_url', movieService.createPayment);

    // router.get('/api/now-showing', movieController.getMovieNowShowing);
    router.post('/api/create-showtime-detail', movieController.createShowtimeDetail);
    router.post('/api/create-ticket', movieController.createTicket);
    router.post('/api/create-bill-food', movieController.createBillFood);
    router.post('/api/create-detail-ticket', movieController.createDetailTicket);
    router.get('/api/get-now-showing', movieController.getMovieNowShowing);
    router.get('/api/get-event', movieController.getEvent);
    router.get('/api/get-payment-methods', movieController.getPaymentMethods);
    router.get('/api/get-all-movie', movieController.handleGetAllMovie);
    router.get('/api/get-movie-detail', movieController.handleGetMovieDetail);
    router.get('/api/get-movie-format-by-Id', movieController.getMovieFormatById);
    router.get('/api/get-theater-by-Id', movieController.getTheaterById);
    router.get('/api/get-movie-by-Id', movieController.getMovieById);
    router.get('/api/get-member-by-IdTK', movieController.getMemberByIdTK);
    router.get('/api/get-Ticket-by-IdTV', movieController.getTicketByIdTV);
    router.get('/api/get-DetailTicket-by-IdTicket', movieController.getDetailTicketByIdTicket);
    router.get('/api/get-payment-by-Id', movieController.getPaymentById);
    router.get('/api/get-rating-by-IdMovie', movieController.getRatingByIdMovie);
    router.get('/api/get-idSeat-by-idShowtime', movieController.getIdSeatByIdShowtime);
    router.get('/api/get-email-by-Id', movieController.getEmailById);
    router.get('/api/get-showtime-by-date', movieController.getShowtimeByDate);
    router.get('/api/get-seat-by-cinemaRoomId', movieController.getSeatByCinemaRoomId);
    router.get('/api/get-seat-by-cinemaRoomIdVIP', movieController.getSeatByCinemaRoomIdVIP);

    return app.use("/", router);
}

module.exports = initWebRoutes;