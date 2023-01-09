// Create a header component to show the logo and the title of the app.
//Using React bootstarap
// Add the following code to the src/components/Header.jsx file:
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'; // import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Navbar.css";


export default function NavbarApp() {
  return (
    <div>
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container >
        <Navbar.Brand href="#">NUProjects</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">FAQ</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>

          
          {/* Add Profile */}
          <Nav>
          <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Jobs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="search-area">
      <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search positions..."
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success" className="search-button">Search</Button>
      <DropdownButton id="dropdown-basic-button" className="filter-button" title="Filter">
        <Dropdown.Item href="#/action-1">Research Positions</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Paid Positions</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Academic Positions</Dropdown.Item>
      </DropdownButton>
      </Form>
    </div>
  </div>
  );
}
