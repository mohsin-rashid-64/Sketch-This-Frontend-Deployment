import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import "./Navbar.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import Login from '../Login/Login';
import Register from '../Login/Register';
import { Link } from "react-router-dom";
import AuthModalContainer from "../Login/AuthModalContainer.js";


import { AuthContext } from "../../Context/AuthContext.js";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginModal = () => setShowLogin(!showLogin);
    const handleRegisterModal = () => setShowRegister(!showRegister);

    const { _auth, _setAuth } = useContext(AuthContext);

    const handleScroll = () => {
        setScrolling(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

   

    return (
        <>
            
            <BootstrapNavbar
                className={`${scrolling ? "scrolling" : ""}`}
                expand="lg"
                fixed="top"
            >
                <Container>
                    <BootstrapNavbar.Brand href="/">
                        <img src="/images/logo.png" alt="logo" width="140px" height="auto" />
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle className="customToggle" onClick={() => setNavbar(!navbar)} />
                    <BootstrapNavbar.Collapse>
                        <Nav className="ml-auto">
                            <BootstrapNavbar.Toggle className="cross" onClick={() => setNavbar(!navbar)} />
                            <NavLink exact to="/" className="nav-link" activeClassName="active" onClick={() => setNavbar(!navbar)}>
                                <span>Home</span>
                            </NavLink>
                            <NavLink to="/about-us" className="nav-link" activeClassName="active" onClick={() => setNavbar(!navbar)}>
                                <span>About Us</span>
                            </NavLink>
                            <NavLink to="/inspirations" className="nav-link" activeClassName="active" onClick={() => setNavbar(!navbar)}>
                                <span>Inspirations</span>
                            </NavLink>
                            <NavLink to="/blog" className="nav-link" activeClassName="active" onClick={() => setNavbar(!navbar)}>
                                <span>Blog</span>
                            </NavLink>
                            {_auth ? (
                                <Dropdown className="loginBtn">
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <img className="img1" src="/images/account.svg" alt="account" />
                                        <img className="img2" src="/images/arDown.svg" alt="arDown" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/">Your Account</Dropdown.Item>
                                        <Link to="/edit-profile">Edit Profile</Link>
                                        <Link to="/seeBoard">My Boards</Link>
                                        <Link to="/account-management">Account Management</Link>
                                        <button type="button" onClick={() => {
                                            _setAuth(false);
                                            

                                            navigate("/")
                                            localStorage.removeItem('jwt');
                                        }}>Sign out</button>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <>
                                <AuthModalContainer/>
                                    {/* <button className="nav-link" onClick={() => { setShowLogin(true) }}>Login</button>
                                    <button onClick={() => { setShowRegister(true) }} className="nav-link">Register</button> */}
                                </>
                            )}
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
           
            <Login show={showLogin} handleClose={handleLoginModal} setIsAuthenticated={setIsAuthenticated} />
            <Register show={showRegister} handleClose={handleRegisterModal} />
        </>
    );
};

export default Navbar;
