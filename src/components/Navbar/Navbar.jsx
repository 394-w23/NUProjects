import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import { signInWithGoogle, signOut } from "../../utilities/firebase";
import Image from "react-bootstrap/Image";
import { UserContext } from "../../context/UserContext";

export default function NavbarApp() {
  const { user, setUserFromDatabase } = useContext(UserContext);

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    await setUserFromDatabase(user.uid);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const SignInButton = () => (
    <Nav.Link onClick={handleSignIn}>Sign in</Nav.Link>
  );

  const SignOutButton = () => (
    <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
  );

  // const activation = ({ isActive }) => (isActive ? "active" : "inactive");

  console.log("Navbar - render");

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
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
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
