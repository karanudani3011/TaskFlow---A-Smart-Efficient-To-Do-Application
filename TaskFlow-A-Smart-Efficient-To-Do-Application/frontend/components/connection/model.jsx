import { signUpApi, signInApi, addTodoApi, getAllTodoApi, updateTodoApi, deleteTodoApi, adminLogin } from "./data"

function SignInData({ User, Pass }) {

    if (User == "" || Pass == "") {
        alert("Empty value <-> From Connection Function - SignInData")
        return
    }


    signInApi({ User: User, Pass: Pass })
}


function SignUpData({ User, Pass }) {
    if (User == "" || Pass == "") {
        alert("Empty value <-> From Connection Function - SignUpData")
        return
    }

    signUpApi({ User: User, Pass: Pass })
}

function AddTodoData({ Task, Status, Deadline }) {



    if (Task == "" || Status == "" || Deadline == "") {

        alert("Fild can't be empty")
        return
    }

    addTodoApi({ Task: Task, Status: Status, Deadline: Deadline })

}

function GetTodoData() {

    return getAllTodoApi()

}

function UpdateTodo({ TodoId, Task, Status, Deadline }) {

    if (Task == "" || Status == "" || Deadline == "") {

        alert("Fild can't be empty")
        return
    }

    updateTodoApi({ TodoId: TodoId, Task: Task, Status: Status, Deadline: Deadline })


}


function DeleteTodo({ TodoId }) {

    deleteTodoApi({ TodoId: TodoId })
}


const AdminLogin = (User, Pass) => {

    if (User == "" || Pass == "") {
        alert("Fild can't be empty")
        return
    }
    adminLogin(User, Pass);
}

export {
    SignInData,
    SignUpData,
    AddTodoData,
    GetTodoData,
    UpdateTodo,
    DeleteTodo,
    AdminLogin
}