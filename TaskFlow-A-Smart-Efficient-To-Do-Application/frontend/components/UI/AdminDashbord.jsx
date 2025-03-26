import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashbord = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [usersPerPage] = useState(5); // Number of users per page
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        renderUser({ setUsers, setFilteredUsers });
    }, []);

    useEffect(() => {
        if (filteredUsers.length > 0) {
            setTotalPages(Math.ceil(filteredUsers.length / usersPerPage)); // Calculate total pages
        }
    }, [filteredUsers]);

    if (!window.sessionStorage.getItem("AdminSession")) {
        window.location.replace("http://localhost:5173/AdminLogin");
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = users.filter(user => user.username.toLowerCase().includes(value));
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to the first page when search term changes
    };

    // Get the users to display on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change the page when user clicks on a page number
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
                Users List
            </h1>
            <input
                type="text"
                placeholder="Search user..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "6px", overflow: "hidden" }}>
                <thead>
                    <tr style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left" }}>
                        <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Username</th>
                        <th style={{ padding: "12px", borderBottom: "2px solid #ddd", textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user._id} style={{ backgroundColor: "#f9f9f9" }}>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", color: "#333" }}>{user.username}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    style={{
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        transition: "0.2s ease-in-out"
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                                >
                                    View Todos
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ padding: "8px 16px", marginRight: "5px", cursor: "pointer" }}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            style={{
                                padding: "8px 16px",
                                margin: "0 5px",
                                backgroundColor: currentPage === index + 1 ? "#007bff" : "#fff",
                                color: currentPage === index + 1 ? "#fff" : "#007bff",
                                border: "1px solid #ddd",
                                cursor: "pointer"
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ padding: "8px 16px", marginLeft: "5px", cursor: "pointer" }}
                    >
                        Next
                    </button>
                </div>
            )}

            {selectedUser && <UserTodos user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

const UserTodos = ({ user, onClose }) => (
    <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
            {user.username}'s Todos
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr style={{ backgroundColor: "#28a745", color: "#fff", textAlign: "left" }}>
                    <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Task</th>
                    <th style={{ padding: "10px", borderBottom: "2px solid #ddd", textAlign: "center" }}>Status</th>
                    <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Deadline</th>
                </tr>
            </thead>
            <tbody>
                {user.todos.map((todo, index) => (
                    <tr key={todo._id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", color: "#555" }}>{todo.task}</td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "120px",
                                    padding: "6px 12px",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    color: "#fff",
                                    backgroundColor:
                                        todo.status === "Completed"
                                            ? "#28a745"
                                            : todo.status === "Pending"
                                            ? "#dc3545"
                                            : "#ffc107",
                                }}
                            >
                                {todo.status}
                            </span>
                        </td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", color: "#777" }}>
                            {new Date(todo.deadline).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })},{" "}
                            {new Date(todo.deadline).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button
            onClick={onClose}
            style={{
                marginTop: "15px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.2s ease-in-out",
                display: "block",
                width: "100%",
                textAlign: "center"
            }}
        >
            Close Todos
        </button>
    </div>
);

function renderUser({ setUsers, setFilteredUsers }) {
    axios
        .post("http://localhost:3000/getalluser", {}, { headers: { adminname: "d7@123" } })
        .then((res) => {
            setUsers(res.data);
            setFilteredUsers(res.data);
        })
        .catch(() => alert("Error getting all Users"));
}

export { AdminDashbord };
