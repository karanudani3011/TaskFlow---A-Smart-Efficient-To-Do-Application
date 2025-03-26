// import { userModel } from "../models/userModel";

//Add any middleware logic you want
async function userMiddleware(req, res, next) {

    next()
}


module.exports = {
    userMiddleware
}