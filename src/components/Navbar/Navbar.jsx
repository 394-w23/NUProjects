// Create a header component to show the logo and the title of the app.
//Using React bootstarap
// Add the following code to the src/components/Header.jsx file:
import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"; // import logo from '../logo.svg';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Navbar.css";
import {
  signInWithGoogle,
  signOut,
  writeUserData,
} from "../../utilities/firebase";
import Image from "react-bootstrap/Image";
import { UserContext } from "../../context/UserContext";

export default function NavbarApp() {
  const { user } = useContext(UserContext);

  const handleSignUp = async () => {
    const user = await signInWithGoogle();
    const params = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      jobsCreated: [],
      jobsApplied: [],
      jobsSaved: [],
    };

    await writeUserData(params);
  };

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    signOut();
  };

  const SignUpButton = () => (
    <Nav.Link onClick={handleSignUp}>Sign Up</Nav.Link>
  );

  const SignInButton = () => (
    <Nav.Link onClick={handleSignIn}>Sign in</Nav.Link>
  );

  const SignOutButton = () => (
    <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
  );

  const activation = ({ isActive }) => (isActive ? "active" : "inactive");

  return (
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">NUProjects</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav>
              {!user && (
                <div className="auth-buttons">
                  <SignInButton />
                  <SignUpButton />
                </div>
              )}
              {user && (
                <NavDropdown
                  title={
                    <Image
                      roundedCircle
                      src={user.profilePic}
                      width={30}
                      referrerPolicy="no-referrer"
                    />
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href={`/profile/${user.userId}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <SignOutButton />
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
