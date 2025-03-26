// Creating the Wrapper for the SignUP and the SignIN
// Both SignUp and SignIn will have a Header named {Create Account} {Login}
// The type will be provided by the component which is using it

// Basically we are exporting a pre-built component wrapper that will be used for
// Both Login and Create Account will have the same outer
function AuthWrapper({ children, PageType }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh", // Full viewport height to center vertically
            backgroundColor: "#f0f8ff" // Light background for the whole screen
        }}>
            <div style={{
                backgroundColor: "powderblue",
                width: 300,
                border: "3px solid black",
                padding: 20,
                borderRadius: 10, // Optional: Adds rounded corners
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a soft shadow for better look
                textAlign: "center"
            }}>
                <h1>{PageType}</h1>
                {children}
            </div>
        </div>
    );
}

export default AuthWrapper;
