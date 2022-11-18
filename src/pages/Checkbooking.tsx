import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import DisplayDetails from "../components/DisplayDetails/DisplayDetailsRoom";
import { BookingRoom, BookingHall } from "../types/types";
import Stack from "react-bootstrap/Stack";
import axios from "axios";

import roomsBackground from "../assets/images/about_banner.jpg";

import "../components/parallaxImage.css";
import DisplayDetailsHall from "../components/DisplayDetails/DisplayDetailsHall";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";
import { Navigate } from "react-router-dom";

interface Res {
  data: BookingRoom[];
  loading: boolean;
}

interface Res1 {
  data: BookingHall[];
  loading: boolean;
}

export const Checkbooking = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // const { data, isLoading } = useGetBookingsQuery(user._id);

  // let bookings: BookingRoom[] = [];

  // setBookings(data);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [del, setDel] = React.useState<boolean>(false);
  const [bookings, setBookings] = React.useState<BookingRoom[]>([]);

  // useEffect(() => {
  //   const getBookings = async () => {
  //     setLoading(true);
  //     const res = await axios.get(`bookings/${user._id}`);
  //     setBookings(res.data);
  //     setLoading(false);
  //   };

  //   getBookings();
  // }, []);

  useEffect(() => {
    const a = async () => {
      setLoading(true);
      const { data } = await axios.get(`bookings/${user._id}`);
      setBookings(data);

      setLoading(false);
    };
    a();
  }, [del, setDel]);

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${roomsBackground})`, height: "100vh" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">YOUR BOOKINGS</h1>
            </div>
          </div>
        </div>

        <Stack
          direction="horizontal"
          gap={3}
          style={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "100%",
            padding: "2rem",
            justifyContent: "space-around",
          }}
        >
          {" "}
        </Stack>
      </div>

      <div>
        <Container>
          <br />
          <br />
          {loading ? (
            <h1>Loading</h1>
          ) : (
            <div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {bookings?.length ? (
                  <DisplayDetails bookings={bookings} setDel={setDel} />
                ) : (
                  <div
                    style={{
                      marginTop: "2rem",
                      color: "red",
                      height: "5rem",
                    }}
                  >
                    <h5>No Room Bookings Found: </h5>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
};

export default Checkbooking;
