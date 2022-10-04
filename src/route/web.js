import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import movieController from '../controllers/movieController'

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
    router.delete('/api/delete-staff', userController.handleDeleteStaff);

    router.get('/api/get-movie', userController.getMovie);
    router.get('/api/get-genre', userController.getGenre);
    router.get('/api/get-province', movieController.getProvince);
    router.get('/api/get-theater', movieController.getTheater);
    router.get('/api/get-cinema-room', movieController.getCinemaRoom);
    router.post('/api/create-new-movie', userController.handleCreateNewMovie);

    // router.get('/api/now-showing', movieController.getMovieNowShowing);

    router.get('/api/get-now-showing', movieController.getMovieNowShowing);
    router.get('/api/get-all-movie', movieController.handleGetAllMovie);
    router.get('/api/get-movie-detail', movieController.handleGetMovieDetail);

    return app.use("/", router);
}

module.exports = initWebRoutes;