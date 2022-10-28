import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseFetch } from "../../customHook/UseFetch";
import { Addon } from "../../types/types";
import "./bookingdetails.css";

interface ResAddon {
  data: Addon[];
  loading: boolean;
}

interface State {
  no: number;
  checkin: Date;
  checkout: Date;
  roomType: string;
  roomPrice: number;
  totalPrice: number;
  key: string;
}

export const BookingDetails = () => {
  const location = useLocation();
  const { no, checkin, checkout, roomType, roomPrice, totalPrice, key }: State =
    location.state;
  console.log(location.state);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const specialReqRef = useRef<HTMLTextAreaElement>(null);
  const couponRef = useRef<HTMLInputElement>(null);

  const [coupon, setCoupon] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRemRef = useRef<HTMLButtonElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);

  const [apply, setApply] = useState(false);

  const navigate = useNavigate();

  let total_price = totalPrice;

  const { data, loading }: ResAddon = UseFetch(`addon`);
  let addOns = {};
  if (!loading) {
    data.forEach((item) => {
      addOns[item.name] = Number(item.price);
    });
  }

  const [selectCheck, setSelectCheck] = useState({
    addon: [],
  });

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    Object.values(filtAddOn()).forEach((each: any) => {
      total_price += each;
    });
    setTotal(
      total_price +
        addOnPrice() -
        (total_price + addOnPrice()) * (discount / 100)
    );
  }, [selectCheck]);

  const handleAddon = (e) => {
    if (e.target.checked) {
      setSelectCheck({
        addon: [...selectCheck.addon, e.target.value],
      });
    }
    if (!e.target.checked) {
      setSelectCheck({
        addon: selectCheck.addon.filter((item) => item !== e.target.value),
      });
    }
  };

  const filtAddOn = () => {
    let a = {};
    selectCheck.addon.forEach((each) => {
      if (Object.keys(addOns).includes(each)) {
        a[each] = addOns[each];
      }
    });
    return a;
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    // const coupon = couponRef.current?.value;
    const res = await axios.post("coupon/validate", {
      coupon,
    });

    if (res.data == "Invalid Coupon") {
      toast.error(res.data);
    } else {
      setDiscount(res.data);
      toast.success("Coupon Applied Successfully");
      setApply(true);
      couponRef.current.disabled = true;
      let price = total * (res.data / 100);
      setTotal(total - price);
      buttonRef.current.disabled = true;
    }
  };

  const handleRemoveCoupon = async (e) => {
    e.preventDefault();
    const res = await axios.post("coupon/validate", {
      coupon,
    });
    setDiscount(0);
    toast.success("Coupon Removed Successfully");
    couponRef.current.disabled = false;
    setTotal(totalPrice);
    buttonRemRef.current.disabled = true;
  };

  const addOnPrice = () => {
    let price = 0;
    Object.values(filtAddOn()).forEach((each: any) => {
      price += each;
    });
    return price;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const specialReq = specialReqRef.current?.value;

    if (name === "" || email === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const selectedAddons = filtAddOn();
    const data = {
      name,
      email,
      date: new Date(),
      specialReq,
      selectedAddons,
      no,
      checkin,
      checkout,
      roomType,
      roomPrice,
      coupon: {
        coupon,
        discount: discount.toString(),
      },
      total:
        total_price +
        addOnPrice() -
        (total_price + addOnPrice()) * (discount / 100),
    };
    let res: any;

    if (key == "Hall") {
      res = await axios.post(`booking/hall`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      res = await axios.post(`booking/room`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (res.data.message == "Booking Successful") {
      toast.success("Booking Successful");
      navigate("/booking/success", {
        state: { data, key },
      });
    } else {
      toast.error("Booking Failed");
    }
  };

  return (
    <Form id="c" onSubmit={handleSubmit}>
      <div>
        <Container className="booking-details">
          <div id="container">
            {key == "Hall" ? (
              <h2 id="title-of-form">BOOK A HALL WITH US</h2>
            ) : (
              <h2 id="title-of-form">BOOK A ROOM WITH US</h2>
            )}
            <br />
            <div id="personal-details">
              <Form.Group id="name-group" className="mb-3">
                <Form.Label id="name-label">Name</Form.Label>
                <Form.Control id="name-id" type="text" ref={nameRef} required />
              </Form.Group>

              <Form.Group
                id="email-group"
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label id="email-label" htmlFor="email" required>
                  E-mail
                </Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="visitor_email"
                  required={true}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
              </Form.Group>
            </div>
            <hr />

            <div id="details">
              <div>
                <Form.Group>
                  <Form.Label htmlFor="adult" id="checkin">
                    <p className="bold">Check In : </p>
                    {checkin.toDateString()}
                  </Form.Label>
                  <Form.Label htmlFor="adult" id="checkout">
                    <p className="bold">Check Out : </p>
                    {checkout.toDateString()}
                  </Form.Label>
                </Form.Group>
              </div>

              <div>
                {key == "Hall" ? (
                  <div></div>
                ) : (
                  <Form.Group>
                    <Form.Label htmlFor="adult" id="room-qnty">
                      <p className="bold">Number of rooms :</p> {no}
                    </Form.Label>
                  </Form.Group>
                )}

                <Form.Group>
                  <Form.Label htmlFor="adult" id="room-type">
                    <p className="bold">Type : </p>
                    {roomType}
                  </Form.Label>
                </Form.Group>
              </div>
            </div>

            <hr />
            <Form.Group>
              <br />
              <Form.Label id="addons"> Select Addons: </Form.Label>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <div id="addon-list">
                  {Object.entries(addOns).map(([key, value]) => (
                    <Form.Group style={{ display: "flex" }}>
                      <Form.Check
                        ref={checkRef}
                        className="checkbox-Form.Control"
                        id={key}
                        name={key}
                        value={key}
                        type="checkbox"
                        onChange={handleAddon}
                      />
                      <Form.Label className="checkbox" id="check-box">
                        {key} <br />{" "}
                      </Form.Label>
                      <p style={{ fontSize: "0.8rem" }}>₹ {String(value)}</p>
                    </Form.Group>
                  ))}
                </div>
              )}
            </Form.Group>
            <hr />

            <Form.Group>
              <Form.Label htmlFor="message" id="special-req">
                Special Request?
              </Form.Label>
              <textarea
                ref={specialReqRef}
                id="message"
                name="visitor_message"
                placeholder="Tell us anything else that might be important."
                defaultValue={""}
              />
              <hr />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="coupon" id="coupon">
                Coupon Code:{" "}
              </Form.Label>
              <div id="coupon-section">
                {" "}
                <Form.Control
                  id="coupon-box"
                  type="text"
                  ref={couponRef}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button
                  id="coupon-btn"
                  ref={buttonRef}
                  disabled={coupon === ""}
                  onClick={handleCoupon}
                >
                  Apply
                </Button>
                <Button
                  id="coupon-btn"
                  ref={buttonRemRef}
                  disabled={!apply}
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </Button>
              </div>
            </Form.Group>
          </div>
        </Container>
      </div>

      <div>
        <Container className="booking-details">
          <div className="price-details">
            <table id="booking-details-tables">
              <tr>
                <th>Details</th>
              </tr>
              <tr>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td> Base Price: </td>
                <td> ₹ {roomPrice}</td>
              </tr>
              <tr>
                <td>Room(s):</td>
                <td> {no}</td>
              </tr>

              <tr>
                <td>No. of Night(s):</td>
                <td>
                  {Math.abs(checkout.getTime() - checkin.getTime()) /
                    (1000 * 3600 * 24)}
                </td>
              </tr>

              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>

              <tr>
                <td
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "black",
                    justifyContent: "left",
                  }}
                >
                  {no} Room(s) x{" "}
                  {Math.abs(checkout.getTime() - checkin.getTime()) /
                    (1000 * 3600 * 24)}{" "}
                  Night(s):
                </td>

                <td>₹{totalPrice}</td>
              </tr>

              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>

              <tr>
                <td>Addons:</td>
                <td>₹{addOnPrice()}</td>
              </tr>

              <tr>
                <td>Sub Total:</td>
                <td>₹{totalPrice + addOnPrice()}</td>
              </tr>

              <tr>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
              </tr>
              <tr>
                <td>Coupon Discount:</td>
                <td>{discount}%</td>
              </tr>
              <tr>
                <td>Discount Amount:</td>
                <td>₹{(total_price + addOnPrice()) * (discount / 100)}</td>
              </tr>
              <tr>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
              </tr>
              <tr style={{ fontSize: "1.3rem" }}>
                <td>Total : </td>
                <td>
                  ₹
                  {total_price +
                    addOnPrice() -
                    (total_price + addOnPrice()) * (discount / 100)}
                </td>
              </tr>
              <tr>
                <td>
                  <br />
                </td>
              </tr>
            </table>
            <Button variant="primary" type="submit" id="submit-booking-btn">
              Book Now
            </Button>
          </div>
        </Container>
      </div>
    </Form>
  );
};

export default BookingDetails;
