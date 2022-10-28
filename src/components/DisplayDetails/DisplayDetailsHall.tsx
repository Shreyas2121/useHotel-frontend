import React from "react";
import { Button } from "react-bootstrap";
import { BookingHall } from "../../types/types";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./DisplayDetails.css";
import { Checkmark } from "react-checkmark";

interface Props {
  bookingDetails1: BookingHall[];
  setDel: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayDetailsHall = ({ bookingDetails1, setDel }: Props) => {
  const handleSubmit = async (id: string) => {
    const res = await axios.delete(
      `booking/hall/${id}`
    );
    console.log(res);
    if (res.status === 200) {
      setDel(true);
      toast.success("Reservation deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };
  const check_ongoin = (checkin: string, checkout: string) => {
    const checkin_date = new Date(checkin);
    const checkout_date = new Date(checkout);
    const today = new Date();
    if (today >= checkin_date && today <= checkout_date) {
      return true;
    } else {
      return false;
    }
  };

  const check = (date: string) => {
    const newDate = new Date(date);
    const currentDate = new Date();
    if (newDate.getFullYear() === currentDate.getFullYear()) {
      if (newDate.getMonth() <= currentDate.getMonth()) {
        if (newDate.getDate() <= currentDate.getDate()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (newDate.getFullYear() < currentDate.getFullYear()) {
      return true;
    }
  };

  return (
    <div id="table-div">
      <h5>
        Hall bookings Found for E-mail:
      </h5>
      <Table striped bordered hover>
        <thead>
          <tr id="table-headings">
            <th>Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Hall Type</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails1.map((booking) => (
            <>
              {booking._id ? (
                <tr>
                  <td>{booking.name}</td>
                  <td>{new Date(booking.check_in_date).toDateString()}</td>
                  <td>{new Date(booking.check_out_date).toDateString()}</td>
                  <td>{booking.category}</td>

                  <td>{booking.total}</td>
                  <td>
                    {check(booking.check_in_date) ? (
                      <span>
                        {check_ongoin(
                          booking.check_in_date,
                          booking.check_out_date
                        ) ? (
                          <span>On-going</span>
                        ) : (
                          <span>
                            <Checkmark size="40px" />
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>Incomplete</span>
                    )}
                  </td>
                  <td>
                    {check(booking.check_in_date) ? (
                      <span>
                        {check_ongoin(
                          booking.check_in_date,
                          booking.check_out_date
                        ) ? (
                          <span id="Ongoing">
                            --------------------------------
                          </span>
                        ) : (
                          <span>
                            <Button id="AddReview">
                              <Link
                                to="/addreview"
                                state={{
                                  name: booking.name,
                                  email: booking.email,
                                }}
                              >
                                Add Review
                              </Link>
                            </Button>
                          </span>
                        )}
                      </span>
                    ) : (
                      <Button
                        onClick={(e) => handleSubmit(booking._id)}
                        id="Cancel_Booking"
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>No Booking</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayDetailsHall;
