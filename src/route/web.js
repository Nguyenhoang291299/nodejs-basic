import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
    // simple query
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailpage)

    // router.get('/about', homeController.getAboutpage)
    return app.use('/',router)
}

export default initWebRoute;