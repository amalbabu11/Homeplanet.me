import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import React from "react";

function OurNavbar() {
  return (
    <Navbar
      collapseOnSelect
      className="Navbar-custom"
      expand="lg"
      variant="light"
    >
      <Container>
        <Navbar.Brand className="Title-text" href="/" style={{color: 'white'}}>
          HomePlanet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Planets" style={{color: 'white'}} className="nav-link">Planets</Nav.Link>
            <Nav.Link href="/Moons" style={{color: 'white'}} className="nav-link">Moons</Nav.Link>
            <Nav.Link href="/Stars" style={{color: 'white'}} className="nav-link">Stars</Nav.Link>
          </Nav>
          <Nav><Nav.Link href="/Search" style={{color: 'white'}} className="nav-link">Search</Nav.Link></Nav>
          <Nav><Nav.Link href="/About" style={{color: 'white'}} className="nav-link">About</Nav.Link></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OurNavbar;
