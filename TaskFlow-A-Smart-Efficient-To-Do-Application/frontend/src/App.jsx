  import { useState, useEffect } from 'react';
  import './App.css';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { SignIn } from '../components/UI/SignIN';
  import { SignUp } from '../components/UI/SignUP';
  import { TodoList } from '../components/UI/Todo';
  import { AdminLoginComponent } from '../components/UI/AdminLogin';
  import { AdminDashbord } from '../components/UI/AdminDashbord';
import AboutUs from '../components/UI/about';

  function App() {
    const [count, setCount] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Detect mobile screens
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Header component with inline CSS
    const Header = () => {
      const headerStyle = {
        backgroundColor: '#282c34',
        padding: isMobile ? '0.5rem' : '1rem', // Adjust padding for mobile
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000, // Ensure it stays on top of other content
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };

      const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      };

      const navStyle = {
        listStyle: 'none',
        padding: '0',
        marginLeft: 'auto',
      };

      const navItemStyle = {
        display: isMobile ? 'block' : 'inline-block', // Stack items on mobile
        margin: isMobile ? '0.5rem 0' : '0 15px',
      };

      const linkStyle = {
        color: 'white',
        textDecoration: 'none',
      };

      return (
        <header style={headerStyle}>
          <div style={logoContainerStyle}>
            <div> {/* Replace this div with your SVG */}
              <svg width="40" height="40" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="5" fill="none" />
                <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="18" dy=".3em">LOGO</text>
              </svg>
            </div>
            <h1 style={{ color: 'white', margin: 0 }}>TODO Application</h1>
          </div>
          <nav>
            <ul style={navStyle} >
              <li style={navItemStyle}><a href="http://localhost:5173/about" style={linkStyle}>About Us</a></li>
            </ul>
          </nav>
        </header>
      );
    };

    return (
      <>
        <Router>
          <Header />  {/* Include the Header component here */}

          <div style={{ marginTop: '6rem' }}>  {/* Add margin-top to prevent content from hiding behind the fixed header */}
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/Signin" element={<SignIn />} />
              <Route path="/Todos" element={<TodoList />} />
              <Route path='/AdminLogin' element={<AdminLoginComponent />} />
              <Route path='/AdminDashbaord' element={<AdminDashbord />} />
              <Route path='/About' element={<AboutUs />} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }

  export default App;
