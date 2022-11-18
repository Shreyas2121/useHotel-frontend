import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingRoom } from "../../types/types";

import "./success.css";

const ConfirmDetails = () => {
  const {
    state: { data, key },
  } = useLocation();
  let details: BookingRoom = data;

  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Booking is confirmed!!</h5>
        <p className="card-text">
          <span>Name: </span>
          {details.user.name}
        </p>
        <p className="card-text">
          <span>Email: </span>
          {details.user.email}
        </p>
        <p className="card-text">
          <span>Check-in: </span>
          {details.checkIn}
        </p>
        <p className="card-text">
          <span>Check-out: </span>
          {details.checkOut}
        </p>
        <p className="card-text">
          <span>Room Type: </span>
          {details.category}
        </p>
        <p className="card-text">
          <span>Total Price: </span>
          {details.total}
        </p>
        <button onClick={() => navigate("/")} id="btn">
          Go Home
        </button>
        {key == "Hall" ? (
          <div></div>
        ) : (
          <p>
            <small
              style={{
                marginLeft: "3.5rem",
                marginTop: "1rem",
              }}
              className=""
            >
              *Check-in: 12:00 PM, Check-out: 11:00 AM
            </small>
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmDetails;
