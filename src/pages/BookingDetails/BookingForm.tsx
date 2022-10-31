import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseFetch } from "../../customHook/UseFetch";
import { Addon } from "../../types/types";
import "./bookingform.css";

interface ResAddon {
  data: Addon[];
  loading: boolean;
}

interface State {
  no: number;
  checkin: Date;
  checkout: Date;
  type: string;
  basePrice: number;
  totalPrice: number;
  key: string;
}

export const BookingForm = () => {
  const location = useLocation();
  const { no, checkin, checkout, type, basePrice, totalPrice, key }: State =
    location.state;
  console.log(location.state);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const specialReqRef = useRef<HTMLTextAreaElement>(null);
  const couponRef = useRef<HTMLInputElement>(null);

  const [coupon, setCoupon] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonCouponRemoveRef = useRef<HTMLButtonElement>(null);

  const [apply, setApply] = useState(false);

  const navigate = useNavigate();

  let total_price = totalPrice;

  const { data: addOnData, loading }: ResAddon = UseFetch(`addon`);
  let addOns = {};
  if (!loading) {
    addOnData.forEach((item) => {
      addOns[item.name] = Number(item.price);
    });
  }

  const [selectedAddons, setSelectedAddons] = useState({
    addon: [],
  });

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    Object.values(filterAddons()).forEach((each: any) => {
      total_price += each;
    });
    setTotal(
      total_price +
        addOnPrice() -
        (total_price + addOnPrice()) * (discount / 100)
    );
  }, [selectedAddons]);

  const handleAddon = (e) => {
    if (e.target.checked) {
      setSelectedAddons({
        addon: [...selectedAddons.addon, e.target.value],
      });
    }
    if (!e.target.checked) {
      setSelectedAddons({
        addon: selectedAddons.addon.filter((item) => item !== e.target.value),
      });
    }
  };

  const filterAddons = () => {
    let a = {};
    selectedAddons.addon.forEach((each) => {
      if (Object.keys(addOns).includes(each)) {
        a[each] = addOns[each];
      }
    });
    return a;
  };

  const applyCoupon = async (e) => {
    e.preventDefault();
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
    setDiscount(0);
    toast.success("Coupon Removed Successfully");
    couponRef.current.disabled = false;
    setTotal(totalPrice);
    buttonCouponRemoveRef.current.disabled = true;
  };

  const addOnPrice = () => {
    let price = 0;
    Object.values(filterAddons()).forEach((each: any) => {
      price += each;
    });
    return price;
  };

  const validateInputFields = () => {
    if (nameRef.current.value === "" || emailRef.current.value === "") {
      return false;
    }
    return true;
  };

  const calculateTotalPrice = () => {
    return (
      total_price +
      addOnPrice() -
      (total_price + addOnPrice()) * (discount / 100)
    );
  };

  const bookHall = async (res, data) => {
    return (res = await axios.post(`booking/hall`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }));
  };

  const bookRoom = async (res, data) => {
    return (res = await axios.post(`booking/room`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }));
  };

  const submitBooking = async (e: any) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const specialReq = specialReqRef.current?.value;

    if (!validateInputFields()) {
      toast.error("Please fill all the fields");
      return;
    }

    const selectedAddons = filterAddons();
    const data = {
      name,
      email,
      date: new Date(),
      specialReq,
      selectedAddons,
      no,
      checkin,
      checkout,
      category:type,
      basePrice,
      coupon: {
        coupon,
        discount: discount.toString(),
      },
      total: calculateTotalPrice(),
    };
    let res: any;

    if (key == "Hall") {
      res = await bookHall(res, data);
    } else {
      res = await bookRoom(res, data);
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
    <Form id="c" onSubmit={submitBooking}>
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
                    {key == "Hall" ? (
                      <p className="bold">From : </p>
                    ) : (
                      <p className="bold">Check In : </p>
                    )}
                    {checkin.toDateString()}
                  </Form.Label>
                  <Form.Label htmlFor="adult" id="checkout">
                    {key == "Hall" ? (
                      <p className="bold">To : </p>
                    ) : (
                      <p className="bold">Check Out : </p>
                    )}
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
                    {type}
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
                        className="checkbox-Form.Control"
                        id={key}
                        name={key}
                        value={key}
                        type="checkbox"
                        onChange={handleAddon}
                      />
                      <div>
                        <Form.Label className="checkbox" id="check-box">
                          {key} <br />{" "}
                        </Form.Label>
                        <p className="addon-price">₹{String(value)}</p>
                      </div>
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
                  onClick={applyCoupon}
                >
                  Apply
                </Button>
                <Button
                  id="coupon-btn"
                  ref={buttonCouponRemoveRef}
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
                <td> ₹ {basePrice}</td>
              </tr>
              {key == "Hall" ? (
                <tr>
                  <td>Hall:</td>
                  <td>{no}</td>
                </tr>
              ) : (
                <tr>
                  <td>Room(s):</td>
                  <td>{no}</td>
                </tr>
              )}

              {key == "Hall" ? (
                <tr>
                  <td>No. of Day(s):</td>
                  <td>
                    {Math.abs(checkout.getTime() - checkin.getTime()) /
                      (1000 * 3600 * 24) +
                      1}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>No. of Night(s):</td>
                  <td>
                    {Math.abs(checkout.getTime() - checkin.getTime()) /
                      (1000 * 3600 * 24)}
                  </td>
                </tr>
              )}

              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>

              {key == "Hall" ? (
                <tr>
                  <td className="base-prices">
                    {no} Hall x{" "}
                    {Math.abs(checkout.getTime() - checkin.getTime()) /
                      (1000 * 3600 * 24)}{" "}
                    Day(s):
                  </td>

                  <td>₹{totalPrice}</td>
                </tr>
              ) : (
                <tr>
                  <td className="base-prices">
                    {no} Room(s) x{" "}
                    {Math.abs(checkout.getTime() - checkin.getTime()) /
                      (1000 * 3600 * 24)}{" "}
                    Night(s):
                  </td>

                  <td>₹{totalPrice}</td>
                </tr>
              )}

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
                <td>₹{calculateTotalPrice()}</td>
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

export default BookingForm;
