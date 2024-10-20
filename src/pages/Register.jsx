import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FirebaseContext, useFirebase } from "../context/Firebase";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const firebase = useFirebase(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    );
  };
  return (
    <div className=" container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};
