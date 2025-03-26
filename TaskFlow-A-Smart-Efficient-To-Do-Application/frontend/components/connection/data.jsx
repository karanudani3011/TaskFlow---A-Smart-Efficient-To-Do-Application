import axios from 'axios'
import { useEffect } from 'react'

function signInApi({ User, Pass }) {

    const user = {
        username: User,
        password: Pass
    }
    axios.post("http://localhost:3000/signin", {}, {
        'Content-Type': 'multipart/form-data',
        headers: user
    }).then((res) => {



        document.cookie = "JWT=" + res.data.cookie + "; path=/";

        alert("User LogdIn <-> data.js")
        window.location.replace("http://localhost:5173/Todos")

    }).catch((err) => {


        alert("Can't find the user")
    })
}

function signUpApi({ User, Pass }) {

    const user = {
        username: User,
        password: Pass
    }
    //The body feild is at the second place 
    //to send the headder we have to define the body filed 
    axios.post("http://localhost:3000/signup", {}, {
        'Content-Type': 'multipart/form-data',
        headers: user
    }).then((res) => {



        alert("User created <-> data.js")

        window.location.replace('http://localhost:5173/signin');
    }).catch((err) => {



        alert("User Already Exists")
    })
}
function addTodoApi({ Task, Status, Deadline }) {

    //At this point we have to send the JWT along the headers

    //
    let token = getCookie()


    axios.post("http://localhost:3000/addTodo", {

        task: Task,
        status: Status,
        deadline: Deadline
    },
        {
            "Content-Type": "application/json",
            //At this time we are manualy sending the user and pass
            headers: {
                token: token
            }
        }).then((res) => {


            alert("Todo added <-> data.js")

        }).catch((err) => {

            alert("Errro In Todo Creation <-> data.js")
        })

}


//NOT IN USE <-> Moved to the Todo.jsx
function getAllTodoApi() {
    // let todos = []
    //JWT here
    let token = getCookie()


    axios.post("http://localhost:3000/getAllTodo", {}, {

        headers: {
            token: token
        }

    }).then((res) => {

        return res.data
    }).catch((err) => {
        alert("Errro getting all todo <-> data.js")


        return []
    })

    //Returing the empty array until the real object is sent
    return []
}

function updateTodoApi({ TodoId, Task, Status, Deadline }) {

    let token = getCookie()


    axios.post("http://localhost:3000/updateTodo",
        {
            todoid: TodoId,
            task: Task,
            status: Status,
            deadline: Deadline

        }, {
        headers: {
            token: token
        }
    }).then((res) => {
        alert("Update success <-> data.js")

    }).catch((err) => {
        alert("Error in Update <-> data.js")

    })

}
function deleteTodoApi({ TodoId }) {
    let token = getCookie()


    axios.post("http://localhost:3000/deleteTodo", {
        todoid: TodoId
    }, {
        headers: {
            token: token
        }
    }).then((res) => {
        alert("Delete success <-> data.js")

    }).catch((err) => {
        alert("Error In Delete<-> data.js")

    })
}

function getCookie() {

    let cookis = document.cookie
    let token = undefined
    cookis.split(";").map((obj) => {
        if (obj.trim().startsWith("JWT=")) {

            token = obj.split("=")[1]
            return
        }

    })

    return token
}

// Admin Code below

const adminLogin = ({ User, Pass }) => {
    axios.post("http://localhost:3000/adminlogin", {}, {
        headers: {
            username: User,
            password: Pass
        }
    }).then((err) => {

        alert("Admin Found")
        window.sessionStorage.setItem("AdminSession", true)

        window.location.replace("http://localhost:5173/AdminDashbaord")

    }).catch((err) => {

        alert("Admin Pass or Username is not correct")
    })

    return false;

}

export {
    signUpApi,
    signInApi,
    addTodoApi,
    getAllTodoApi,
    updateTodoApi,
    deleteTodoApi,
    getCookie,
    adminLogin

}