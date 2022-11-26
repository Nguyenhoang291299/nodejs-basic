import express from "express";
import Apicontroller from "../controller/Apicontroller";
let router = express.Router();

const initApiRoute = (app) => {
    // simple query
    router.get('/users', Apicontroller.getAllUsers) //method GET -> READ data
    router.post('/create-user', Apicontroller.createNewUser) //method POST -> CREATE data
    router.put('/update-user', Apicontroller.updateUser) //method POST -> PUT data
    router.delete('/delete-user/:id', Apicontroller.deleteUser) //method POST -> READ data
    



    // router.get('/about', homeController.getAboutpage)
    return app.use('/api/v1',router)
}

export default initApiRoute;