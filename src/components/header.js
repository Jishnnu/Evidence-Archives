import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function AppHeader() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    }
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed Out Successfully');
      setAuthUser(null);
      window.location.href = "/logout";
    }).catch(error =>
      console.log(error))
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand href="/Evidence-Archives/">EVIDENCE ARCHIVES</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link> &emsp;
            <Nav.Link as={Link} to="aboutus">About Us</Nav.Link> &emsp;
            <Nav.Link as={Link} to="/form">Upload Evidence</Nav.Link> &emsp;

            {authUser ? (
              <>
                <Nav.Link as={Link} to="/search"> Search </Nav.Link> &emsp;
                <Button variant='success' onClick={userSignOut} name='logout'><FaUser /> &nbsp; Logout </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button variant='success' name='Login'><FaUser /> &nbsp; Police Login </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}