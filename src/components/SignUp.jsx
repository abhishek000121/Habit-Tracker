
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { signUp } from "../utils/auth";

const SignUp = ({ onSignedUp, go }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = signUp({ name, email, password });
      onSignedUp(user);
      go("home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: 420 }} className="p-4 shadow-sm">
        <h4 className="mb-3 text-center">Create Account</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required value={name} onChange={(e)=>setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" className="w-100">Sign Up</Button>
        </Form>
        <div className="mt-3 text-center">
          <small>Already have an account? <a href="#" onClick={()=>go("signin")}>Sign in</a></small>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
