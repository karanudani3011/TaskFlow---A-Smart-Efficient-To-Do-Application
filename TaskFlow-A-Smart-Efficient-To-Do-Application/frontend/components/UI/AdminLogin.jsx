import { useState } from "react";
import { AdminLogin } from "../connection/model";
import AuthWrapper from "./Wrapper";

function AdminLoginComponent() {

    const [Username, setUsername] = useState("");
    const [PassWord, setPassword] = useState("");

    return (
        <AuthWrapper PageType={"Admin Login"}>
            <div style={{
                backgroundColor: "white",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}>
                    UserName
                    <input
                        type="text"
                        placeholder="Username Here"
                        name="User"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                            outline: "none",
                        }}
                    />
                </label>

                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}>
                    PassWord
                    <input
                        type="password"
                        placeholder="PassWord Here"
                        name="Pass"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                            outline: "none",
                        }}
                    />
                </label>

                <button
                    type="submit"
                    onClick={() => {
                        alert("From AdminLogin Component");
                        AdminLogin({ User: Username, Pass: PassWord });
                    }}
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
                >
                    LogIn
                </button>

                <button
                    style={{
                        backgroundColor: "#2196F3",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease",
                        marginTop: "10px"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#1e87db"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#2196F3"}
                    onClick={() => window.location.replace('http://localhost:5173/')}
                >
                    Signup Page
                </button>

            </div>
        </AuthWrapper>
    )

}


export {
    AdminLoginComponent
}