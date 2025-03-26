const { Router } = require("express")
const route = Router()
const { userMiddleware } = require("../midleware/userMiddleware")
const { userModel, adminModel } = require("../models/userModel")
const JWT = require("jsonwebtoken")

//Store the below in .env file 
//Below string is used to create anf varify the JsonWebToken
const jwtPassword = "!@#$%^&*("

route.post("/signup", userMiddleware, async (req, res) => {

    const username = req.headers.username;
    const password = req.headers.password;

    const response = await userModel.findOne({
        username: username,
        // password: password
    })


    if (response) {

        console.log("User Already Exsist <-> route.js")
        res.status(411).json({ MSG: "User Already Exsist" })
        return
    }

    await userModel.create({
        username: username,
        password: password
    })

    console.log("User Created <-> route.js")
    res.status(200).json({ MSG: "User Created" })

})

route.post("/signin", userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const response = await userModel.findOne({
        username: username,
        password: password
    })
    if (!response) {

        console.log("User Doesn't Exsist <-> route.js")
        res.status(411).json({ MSG: "User Doedn't Exsist" })
        return
    }

    const parsed = JWT.sign({
        username: username
    }, jwtPassword)
    console.log(parsed)

    res.status(200).json({
        MSG: "SignIN Successful",
        cookie: parsed
    })

})

route.post("/addTodo", async (req, res) => {

    const token = req.headers.token

    let parsed = ""

    try {
        parsed = JWT.verify(token, jwtPassword)
    } catch (err) {

        console.log("Error in varifying token at <-> route.post /addTodo")
        res.status(211).send("Not a valid token ")
        return
    }
    console.log(parsed)
    // console.log()
    const task = req.body.task
    const status = req.body.status
    const deadline = req.body.deadline

    await userModel.updateOne({
        username: parsed.username
    }, {
        "$push": {
            todos: {
                task: task,
                status: status,
                deadline: deadline
            }
        }
    })
    res.json("Todo added")
})

route.post("/getAllTodo", async (req, res) => {
    const token = req.headers.token

    let parsed = ""

    try {
        parsed = JWT.verify(token, jwtPassword)
    } catch (err) {

        console.log("Error in varifying token at <-> route.post /getTodos")
        res.status(211).send("Not a valid token ")
        return
    }

    let response = await userModel.findOne({
        username: parsed.username
    })

    console.log(response.todos)
    res.json(response.todos)

})

route.post("/updateTodo", async (req, res) => {    //Change this with the JWT
    const token = req.headers.token

    let parsed = ""

    try {
        parsed = JWT.verify(token, jwtPassword)
    } catch (err) {

        console.log("Error in varifying token at <-> route.post /updateTodo")
        res.status(211).send("Not a valid token ")
        return
    }

    const task = req.body.task
    const status = req.body.status
    const deadline = req.body.deadline
    const todoid = req.body.todoid

    //ADD Zod authanticatin
    // console.log(req.headers)

    const isUpdated = await userModel.findOneAndUpdate({
        username: parsed.username,
        "todos._id": todoid
    }, {
        "$set": {
            "todos.$.task": task,
            "todos.$.status": status,
            "todos.$.deadline": deadline
        }
    })



    console.log(isUpdated)
    res.send(isUpdated)

})

route.post("/deleteTodo", async (req, res) => {

    const token = req.headers.token

    let parsed = ""

    try {
        parsed = JWT.verify(token, jwtPassword)
    } catch (err) {

        console.log("Error in varifying token at <-> route.post /addTodo")
        res.status(211).send("Not a valid token ")
        return
    }
    const todoid = req.body.todoid

    const isDeleted = await userModel.findOneAndUpdate({
        username: parsed.username,
        // "todos._id": todoid
    }, {
        "$pull": {
            "todos": {
                _id: todoid
            }
        }

    }, {
        // safe: true
    })

    console.log(isDeleted)
    res.send(isDeleted)


})
//Admin Route Below 
route.post("/adminLogin", async (req, res) => {

    const username = req.headers.username;
    const password = req.headers.password;

    const response = await adminModel.findOne({
        username,
        password

    })
    if (!response) {

        res.status(421).json({
            MSG: "Admin Pass or user id invalid"
        })
        console.log("Admin Pass or user idd invalid")
        return;
    }

    res.json({
        MSG: "Admin Found"
    }).status(200)
    console.log("Admin Found")

})

route.post("/getAllUser", async (req, res) => {

    const user = req.headers.adminname;

    const response = await adminModel.findOne({
        username: user
    })
    console.log(user)

    if (!response) {
        res.status(411).json({
            MSG: "Session Not Valid"
        })
        console.log("Session Not Valid")
        return
    }

    const allUser = await userModel.find({})

    res.status(200).send(
        allUser
    )
})
module.exports = { route }