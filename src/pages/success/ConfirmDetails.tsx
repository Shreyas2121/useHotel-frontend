import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./success.css";

const ConfirmDetails = () => {
  const {
    state: { data, key },
  } = useLocation();

  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Booking is confirmed!!</h5>
        <p className="card-text">
          <span>Name: </span>
          {data.name}
        </p>
        <p className="card-text">
          <span>Email: </span>
          {data.email}
        </p>
        <p className="card-text">
          <span>Check-in: </span>
          {data.checkin?.toDateString()}
        </p>
        <p className="card-text">
          <span>Check-out: </span>
          {data.checkout?.toDateString()}
        </p>
        <p className="card-text">
          <span>Room Type: </span>
          {data.roomType}
        </p>
        <p className="card-text">
          <span>Total Price: </span>
          {data.total}
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
