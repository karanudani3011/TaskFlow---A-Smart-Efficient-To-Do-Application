const mongoos = require("mongoose")
//Create .env file and t=store the user in side it or replace "Your MongoDB URL" with your url
mongoos.connect("")

const userSchema = mongoos.Schema({
    username: String,
    password: String,
    todos: [{
        task: String,
        status: String,
        deadline: String
    }]
})


const adminSchema = mongoos.Schema({
    username:String,
    password:String    
})

const userModel = mongoos.model("User", userSchema)
const adminModel = mongoos.model("Admin",adminSchema)

module.exports = { userModel,adminModel }
