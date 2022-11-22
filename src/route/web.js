import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
    // simple query
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailpage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.get('/edit-user/:id', homeController.getEditUser)
    router.post('/update-user', homeController.postUpdateUser)

    // router.get('/about', homeController.getAboutpage)
    return app.use('/',router)
}

export default initWebRoute;