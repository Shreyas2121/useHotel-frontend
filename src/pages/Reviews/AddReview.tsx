import { Rating } from "@mui/material";
import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Reviews.css";

const AddReview = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { name, email } = location.state;

  const NavigateToAboutUs = () => {
    navigate("/AboutUs");
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState<number>(0);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const submitReview = async (e: any) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const review = reviewRef.current?.value;

    const data = {
      name,
      email,
      rating,
      review,
    };

    const res = await axios.post("reviews", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      toast.success("Review Submitted Successfully");
      NavigateToAboutUs();
    } else {
      toast.error("Review Submission Failed");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="review-form">
        <Form onSubmit={submitReview}>
          <h2 className="Form-Title">How Was Your Experience?</h2>
          <br />
          <Form.Group id="name">
            <Form.Label>Name : </Form.Label>
            <Form.Control value={name} type="text" ref={nameRef} required />
          </Form.Group>
          <br />
          <Form.Group id="email">
            <Form.Label>Email : </Form.Label>
            <Form.Control value={email} type="email" ref={emailRef} required />
          </Form.Group>
          <br />
          <Form.Group
            id="rating"
            style={{
              display: "flex",
            }}
          >
            <Form.Label>Rating : </Form.Label>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Form.Group>
          <br />
          <Form.Group id="review">
            <Form.Label>Review : </Form.Label>

            <Form.Control as="textarea" rows={3} ref={reviewRef} required />
          </Form.Group>
          <br />
          <Button className="w-100" type="submit" ref={buttonRef}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddReview;
