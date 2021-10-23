import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
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
                        <Link to="login">Login</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;