import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import "./navbar.css";
import hotelIcon from "../../public/hotel_icon1.png";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={hotelIcon} />
          useHotel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Book" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/rooms">
                Room
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/halls">
                Hall
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/aboutus">
              About Us
            </Nav.Link>
          </Nav>

          <NavDropdown title="More" id="account1">
            <NavDropdown.Item as={Link} to="/checkbooking" id="dropdownbox">
              Bookings
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
