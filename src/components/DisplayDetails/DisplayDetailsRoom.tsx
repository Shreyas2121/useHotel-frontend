import React from "react";
import { Button } from "react-bootstrap";
import { BookingRoom } from "../../types/types";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./DisplayDetails.css";
import { Checkmark } from "react-checkmark";

interface Props {
  bookings: BookingRoom[];
  setDel: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayDetails = ({ bookings, setDel }: Props) => {
  const deleteRoombooking = async (id: string) => {
    const res = await axios.delete(`delete/${id}`);

    if (res.data.message === "Booking deleted") {
      setDel(true);
      toast.success("Reservation deleted successfully");
    } else {
      toast.error(res.data.message);
    }
  };

  const check_ongoin = (checkin: string, checkout: string): boolean => {
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

    if (newDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="table-div">
      <h5>Room bookings Found for E-mail:</h5>
      <Table striped bordered hover>
        <thead>
          <tr id="table-headings">
            <th>Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Room Type</th>
            <th>No. of rooms</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <>
              {booking._id ? (
                <tr>
                  <td>{booking.user.name}</td>
                  <td>{new Date(booking.checkIn).toDateString()}</td>
                  <td>{new Date(booking.checkOut).toDateString()}</td>
                  <td>{booking.category}</td>
                  <td>{booking.numOfRooms}</td>
                  <td>{booking.total}</td>
                  <td>
                    {check(booking.checkIn) ? (
                      <span>
                        {check_ongoin(booking.checkIn, booking.checkOut) ? (
                          <span>On-going</span>
                        ) : (
                          <span>
                            <Checkmark size="40px" />
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>Upcoming </span>
                    )}
                  </td>
                  <td>
                    {check(booking.checkIn) ? (
                      <span>
                        {check_ongoin(booking.checkIn, booking.checkOut) ? (
                          <></>
                        ) : (
                          <span>
                            <Button id="AddReview">
                              <Link
                                state={{
                                  booking: booking,
                                }}
                                to="/addreview"
                              >
                                Add Review
                              </Link>
                            </Button>
                          </span>
                        )}
                      </span>
                    ) : (
                      <Button
                        onClick={(e) => deleteRoombooking(booking._id)}
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

export default DisplayDetails;
