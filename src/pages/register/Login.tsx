import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../store/userSlice";

import "./register.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // if (!(email && password)) {
    //   return toast.error("Please fill all the fields");
    // }
    const user = {
      email,
      password,
    };
    dispatch(loginUser({ user, navigate }));
  };

  return (
    <>
      <Container className="register-container">
        <h1 className="register-heading">Login</h1>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form className="card" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div>
              <p className="register-text">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
