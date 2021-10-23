import React, {useContext} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {UserContext} from "../../App";
import {getAuth, signOut} from "firebase/auth";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const login = "Login";

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <Navbar className="header-container" bg="light" expand="lg">
            <Container >
                <Navbar.Brand href="#home"><h2>City Travel</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-item">
                        <Link to="home">Home</Link>
                        <Link to="destination">Destination</Link>
                        <Link to="blog">Blog</Link>
                        <Link to="contact">Contact</Link>
                        <Link to="login">{(loggedInUser.name) ?? "Login"}</Link>
                        {/*{ loggedInUser.name && <Link onCLick={handleSignOut}>Sign Out</Link>}*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;