import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Reviews.css";

import RatingCard from "react-star-ratings";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";

import { BookingRoom } from "../../types/types";

interface LocationState {
  booking: BookingRoom;
}

const AddReview = () => {
  const navigate = useNavigate();

  const { booking }: LocationState = useLocation().state as any;
  console.log(booking);

  const user = useAppSelector(selectUser);

  const NavigateToAboutUs = () => {
    navigate("/AboutUs");
  };

  const [rating, setRating] = useState<number>(0);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const submitReview = async (e: any) => {
    e.preventDefault();
    const review = reviewRef.current?.value;

    const data = {
      bookingId: booking._id,
      comment: review,
      rating,
    };

    const res = await axios.post("/review", data);

    if (res.data.message === "Review created") {
      toast.success("Review Submitted Successfully");
      NavigateToAboutUs();
    } else {
      toast.error(res.data);
    }
  };

  return !user ? (
    <div>
      <Navigate to="/login" />
    </div>
  ) : (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="review-form">
        <Form onSubmit={submitReview}>
          <h2 className="Form-Title">How Was Your Experience?</h2>
          <br />
          <br />
          <Form.Group
            id="rating"
            style={{
              display: "flex",
            }}
          >
            <Form.Label
              style={{
                marginRight: "10px",
              }}
            >
              Rating :{" "}
            </Form.Label>

            <RatingCard
              rating={rating}
              starRatedColor="orange"
              starHoverColor="orange"
              changeRating={(newRating) => setRating(newRating)}
              numberOfStars={5}
              starDimension="25px"
              starSpacing="3px"
              name="rating"
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
