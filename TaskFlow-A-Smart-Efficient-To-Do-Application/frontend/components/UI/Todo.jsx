import { useEffect, useState } from "react";
import { AddTodoData, GetTodoData, UpdateTodo, DeleteTodo } from "../connection/model";
import axios from 'axios';
import { getCookie } from "../connection/data";
import "./Todo.css";

function TodoList() {
    const [idtoupdate, setIdToUpdate] = useState("");
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("Pending");
    const [deadline, setDeadline] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(5);

    useEffect(() => {
        renderTodos({ setTodos });
    }, []);

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Inline CSS styles for pagination
    const paginationStyle = {
        marginTop: "20px",
        textAlign: "center",
    };

    const buttonStyle = {
        padding: "8px 16px",
        margin: "0 5px",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
    };

    const buttonActiveStyle = {
        backgroundColor: "#28a745",
        border: "2px solid #28a745",
    };

    const buttonDisabledStyle = {
        backgroundColor: "#ddd",
        cursor: "not-allowed",
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                <h2>Todo List</h2>
                <button onClick={() => {
                    document.cookie = "JWT=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    window.location.replace('http://localhost:5173/signin');
                }}>
                    LogOut
                </button>
            </div>

            <div className="container" style={{ display: "flex", alignItems: "flex-start" }}>
                <div className="add-task-container" style={{ flex: "1", maxWidth: "30%", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", background: "#f9f9f9" }}>
                    <h3>Add Task</h3>
                    <div>
                        <TodoTask id={idtoupdate} task={task} setTask={setTask} taskToEdit={task} />
                        <TodoStatus id={idtoupdate} status={status} setStatus={setStatus} statusToEdit={status} />
                        <TodoDeadline id={idtoupdate} deadline={deadline} setDeadline={setDeadline} deadlineToEdit={deadline} />
                        <TodoButton
                            id={idtoupdate}
                            setIdToUpdate={setIdToUpdate}
                            task={task}
                            status={status}
                            deadline={deadline}
                            setDeadline={setDeadline}
                            setTask={setTask}
                            setStatus={setStatus}
                            setTodos={setTodos}
                        />
                    </div>
                </div>

                <div className="todo-table" style={{ flex: "2", marginLeft: "20px" }}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>Action</th>
                            </tr>
                            {currentTodos.map((obj) => {
                                const date = new Date(obj.deadline);

                                // Function to get color based on status
                                const getStatusStyle = (status) => {
                                    switch (status) {
                                        case "Pending":
                                            return { backgroundColor: "#ffcccc", color: "#b30000" }; // Light red background, dark red text
                                        case "OnGoing":
                                            return { backgroundColor: "#ffe0b3", color: "#b36b00" }; // Light orange background, dark orange text
                                        case "Completed":
                                            return { backgroundColor: "#ccffcc", color: "#008000" }; // Light green background, dark green text
                                        default:
                                            return { backgroundColor: "#eee", color: "#000" };
                                    }
                                };

                                return (
                                    <tr key={obj._id}>
                                        <td>{obj.task}</td>
                                        <td>
                                            <span
                                                style={{
                                                    padding: "5px 12px",
                                                    borderRadius: "20px",  // Capsule shape
                                                    fontWeight: "bold",
                                                    display: "inline-block",
                                                    width: "100px",        // Fixed width for equal size
                                                    textAlign: "center",   // Center the text
                                                    ...getStatusStyle(obj.status)
                                                }}
                                            >
                                                {obj.status}
                                            </span>
                                        </td>
                                        <td>{date.toLocaleDateString("hi-IN")} {date.toLocaleTimeString()}</td>
                                        <td>
                                            <button className="buttonEdit" onClick={() => {
                                                setTask(obj.task);
                                                setStatus(obj.status);
                                                setDeadline(obj.deadline);
                                                setIdToUpdate(obj._id);
                                            }}>Edit</button>
                                            <button className="buttonDelete" onClick={() => {
                                                DeleteTodo({ TodoId: obj._id });
                                                setTimeout(() => renderTodos({ setTodos }), 1200);
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination" style={paginationStyle}>
                {Array.from({ length: Math.ceil(todos.length / todosPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{
                            ...buttonStyle,
                            ...(currentPage === index + 1 ? buttonActiveStyle : {}),
                            ...(currentPage !== index + 1 ? buttonHoverStyle : {}),
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

function renderTodos({ setTodos }) {
    let token = getCookie();

    if (token === undefined) {
        window.location.replace('http://localhost:5173/signin');
        return;
    }
    axios.post("http://localhost:3000/getAllTodo", {}, {
        headers: { token }
    }).then((res) => {
        if (res.status === 211) {
            alert("Token Not valid at TODO.js");
            window.location.replace('http://localhost:5173/signin');
            return;
        }
        setTodos(res.data);
    }).catch((err) => {
        alert("Error getting all todos");
        console.log(err);
        return [];
    });
}

function TodoButton({ id, task, status, deadline, setTodos, setIdToUpdate, setTask, setStatus, setDeadline }) {
    if (id === "") {
        return (
            <button onClick={() => {
                AddTodoData({ Task: task, Status: status, Deadline: deadline });
                setTimeout(() => renderTodos({ setTodos }), 1200);
            }}>Save</button>
        );
    } else {
        return (
            <>
                <button onClick={() => {
                    UpdateTodo({ Task: task, Status: status, Deadline: deadline, TodoId: id });
                    setTimeout(() => renderTodos({ setTodos }), 1200);
                }}>Update</button>
                <button onClick={() => {
                    setStatus("Pending");
                    setIdToUpdate("");
                    setDeadline("");
                    setTask("");
                }}>Cancel</button>
            </>
        );
    }
}

function TodoTask({ id, task, setTask, taskToEdit }) {
    return (
        <>
            <label>Task</label><br />
            <input type="text" placeholder={id === "" ? "New Task" : "Edit the task"} value={task} onChange={(e) => setTask(e.target.value)} /><br />
        </>
    );
}

function TodoStatus({ id, status, setStatus, statusToEdit }) {
    return (
        <>
            <label>Status</label><br />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="OnGoing">OnGoing</option>
                <option value="Completed">Completed</option>
            </select><br />
        </>
    );
}

function TodoDeadline({ id, deadline, setDeadline, deadlineToEdit }) {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    return (
        <>
            <label>Deadline</label><br />
            <input type="datetime-local" value={deadline} min={formattedDate} max="9999-12-31T23:59" onChange={(e) => setDeadline(e.target.value)} /><br /><br />
        </>
    );
}

export { TodoList };
