import React, { useState, useEffect } from "react";
import RoomDetailsCard from "../components/Cards/RoomDetailsCard";
import "../components/search.css";
import "./rooms.css";
import { UseFetch } from "../customHook/UseFetch";
import { Room } from "../types/types";
import axios from "axios";

import "../components/parallaxImage.css";

import roomsBackground from "../assets/images/about_banner.jpg";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Loader from "../Loader";

interface Res {
  data: {
    rooms: Room[];
  };
  loading: boolean;
}

interface Status {
  Basic: number;
  Suite: number;
  Deluxe: number;
}
interface ResStatus {
  data: Status;
}

const Rooms = () => {
  const { data: allRooms, loading }: Res = UseFetch(`room/getDetails`);

  const [check, setCheck] = useState<any>();
  const [checkIn, setCheckIn] = useState<any>("");

  const [checkOut, setCheckOut] = useState<any>();

  const [status, setStatus] = useState<Status>();

  let checkin = new Date(checkIn);
  let checkout = new Date(checkOut);

  const convertDateToSpecificFormat = (date: Date) => {
    if (date.getMonth() === 12) {
      return `${date.getFullYear() + 1}-01-${date.getDate()}`;
    } else if (date.getMonth() < 12) {
      if (date.getDate() < 10) {
        return `${date.getFullYear()}-${
          date.getMonth() + 1
        }-0${date.getDate()}`;
      } else
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else
      return `${new Date().getFullYear() + 1}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
  };

  const handleSearch = async (e) => {
    if (checkIn === "" || checkOut === "") {
      toast.error("Please select checkin and checkout dates");
      return;
    }

    if (checkin > checkout) {
      toast.error("Checkin date cannot be greater than checkout date");
      return;
    }

    if (checkin.toDateString() === checkout.toDateString()) {
      toast.error("Checkin date cannot be equal to checkout date");
      return;
    }

    e.preventDefault();

    const { data }: ResStatus = await axios.post(
      "booking/room/availability",
      {
        checkIn: checkin.toISOString(),
        checkOut: checkout.toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setStatus(data);

    window.scrollTo({
      top: 800,
    });
  };

  useEffect(() => {
    setCheck(convertDateToSpecificFormat(checkout));
  }, [checkIn]);

  const maxAllowedCheckout = () => {
    let date = new Date(checkIn);
    date.setDate(date.getDate() + 30);
    return convertDateToSpecificFormat(date);
  };

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${roomsBackground})`, height: "50rem" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">ROOMS</h1>
              <h4 className="mb-3">AWAY FROM MONOTONOUS LIFE</h4>
              <br />
              <br />
              <br />
              <div
                className="search"
                style={{
                  display: "flex",
                  width: "60rem",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "60%",
                  }}
                >
                  Check-in:{" "}
                  <input
                    id="check-in"
                    className="input-date"
                    min={new Date().toISOString().split("T")[0]}
                    max={check}
                    type="date"
                    onChange={(e) => setCheckIn(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                  Check-out:{" "}
                  <input
                    id="check-out"
                    className="input-date"
                    min={convertDateToSpecificFormat(checkin)}
                    max={maxAllowedCheckout()}
                    type="date"
                    disabled={!checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>
                <Button
                  id="check-availability"
                  variant="primary"
                  size="sm"
                  onClick={handleSearch}
                >
                  Check Availability
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {status && (
        <div style={{ margin: "2rem" }}>
          <h6 style={{ marginLeft: "5%" }}>Select Room Type</h6>
          <hr />
          {loading ? (
            <Loader />
          ) : (
            allRooms?.rooms.map((room) => (
              <RoomDetailsCard
                key={room._id}
                roomData={room}
                checkin={checkin}
                checkout={checkout}
                status={status}
              />
            ))
          )}
        </div>
      )}
    </header>
  );
};

export default Rooms;
