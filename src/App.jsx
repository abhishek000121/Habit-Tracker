
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import YourHabits from "./components/YourHabits";
import HabitTracker from "./components/HabitTracker";
import Leaderboard from "./components/Leaderboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { getCurrentUser, setCurrentUser } from "./utils/auth";

function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const cu = getCurrentUser();
    if (cu) setUser(cu);
  }, []);

  const go = (p) => setPage(p);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setPage("home");
  };

  return (
    <>
      <Header setPage={setPage} currentUser={currentUser} onLogout={handleLogout} />
      <Container className="mt-3">
        {page === "home" && <HabitTracker />}
        {page === "habits" && <YourHabits />}
        {page === "leaderboard" && <Leaderboard />}
        {page === "signin" && <SignIn onSignedIn={(u)=>setUser(u)} go={go} />}
        {page === "signup" && <SignUp onSignedUp={(u)=>setUser(u)} go={go} />}
      </Container>
    </>
  );
}

export default App;



