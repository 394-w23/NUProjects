// Create a header component to show the logo and the title of the app.
//Using React bootstarap
// Add the following code to the src/components/Header.jsx file:
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"; // import logo from '../logo.svg';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Navbar.css";
import { signInWithGoogle, signOut, useAuthState } from '../../utilities/firebase';


const SignInButton = () => (
  <Nav.Link onClick={signInWithGoogle}>Sign in</Nav.Link>
);

const SignOutButton = () => (
  <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
);

const activation = ({isActive}) => isActive ? 'active' : 'inactive';


export default function NavbarApp() {
  const [user] = useAuthState();
  console.log("USER: ", user);
  return (
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">NUProjects</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
            <Nav.Link href="#action1">Home</Nav.Link>
            </Nav>

            {/* Add Profile */}
            <Nav>
              {!user && <SignInButton />}
              {
                user && <NavDropdown title="Profile" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Saved</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <SignOutButton />
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
