import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { registerUser } from "../../store/userSlice";

import "./register.css";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    const phone = phoneRef.current?.value;

    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }

    const user = {
      name,
      email,
      password,
      phone: Number(phone),
    };

    dispatch(registerUser({ user, navigate }));
  };

  return (
    <>
      <Container className="register-container">
        <h1 className="register-heading">Register</h1>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form className="card" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                ref={passwordConfirmRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                ref={phoneRef}
                type="number"
                placeholder="Enter Mobile no"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div>
              <p className="login-text">
                Don't have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Register;
