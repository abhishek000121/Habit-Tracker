
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Header = ({ setPage, currentUser, onLogout }) => {
  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      style={{
        background: "linear-gradient(90deg, #43cea2, #185a9d)",
        padding: "10px 0",
      }}
    >
      <Container>
        <Navbar.Brand
          href="#"
          onClick={(e) => { e.preventDefault(); setPage("home"); }}
          style={{ color: "white", fontWeight: "700" }}
        >
          Habit Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setPage("home")} style={{ color: "white" }}>Home</Nav.Link>
            <Nav.Link onClick={() => setPage("habits")} style={{ color: "white" }}>Your Habits</Nav.Link>
            <Nav.Link onClick={() => setPage("leaderboard")} style={{ color: "white" }}>Leaderboard</Nav.Link>
          </Nav>
          <Nav>
            {!currentUser && (
              <>
                <Nav.Link onClick={() => setPage("signin")} style={{ color: "white" }}>Sign In</Nav.Link>
                <Nav.Link onClick={() => setPage("signup")} style={{ color: "white" }}>Sign Up</Nav.Link>
              </>
            )}
            {currentUser && (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white me-2">Hi, {currentUser.name || currentUser.email}</span>
                <Button variant="light" size="sm" onClick={onLogout}>Logout</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
