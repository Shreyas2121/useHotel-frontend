import React, { useEffect, useState } from "react";

import { UseFetch } from "../customHook/UseFetch";
import { Hall } from "../types/types";
import HallDetailsCard from "../components/Cards/HallDetailsCard";
import axios from "axios";
import Button from "react-bootstrap/Button";

import "../components/search.css";
import "../components/parallaxImage.css";

import roomsBackground from "../assets/images/about_banner.jpg";
import { toast } from "react-toastify";

interface Res {
  data: {
    halls: Hall[];
  };
  loading: boolean;
}

interface availability {
  Birthday: number;
  Conference: number;
  Wedding: number;
}

interface Resavailability {
  data: availability;
}

const Halls = () => {
  const { data: allHalls, loading }: Res = UseFetch("hall");

  const [check, setCheck] = useState<any>();

  const [checkIn, setCheckIn] = useState<any>("");
  const [checkOut, setCheckOut] = useState<any>();
  const [availability, setAvailability] = useState<availability>();
  const [clicked, setClicked] = useState(false);
  const [hallType, setHallType] = useState("");

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
    if (!checkIn || !checkOut || !hallType) {
      toast.error("Please select hall type, checkin and checkout dates");
      return;
    }

    if (checkin > checkout) {
      toast.error("Checkin date cannot be greater than checkout date");
      return;
    }

    e.preventDefault();

    const { data }: Resavailability = await axios.get(`booking/hall/availability?checkIn=${checkin.toISOString()}&checkOut=${checkout.toISOString()}`);

    setAvailability(data);
    setClicked(true);
    window.scrollTo({
      top: 800,
    });
  };

  useEffect(() => {
    setCheck(convertDateToSpecificFormat(checkout));
  }, [checkIn]);

  const maxAllowedCheckout = () => {
    let date = new Date(checkIn);
    date.setDate(date.getDate() + 15);
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
              <h1 className="mb-3">HALLS</h1>
              <h4 className="mb-3">AWAY FROM MONOTONOUS LIFE</h4>
              <br />
              <br />
              <br />
              <div
                id="search"
                className="search"
              >
                <div className="search-inner-box">
                  Hall Type:
                  <select
                    id="select-hall-type"
                    className="input-select"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setHallType(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option value="Conference">Conference</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                  </select>
                  From :{" "}
                  <input
                    id="check-in"
                    className="input-date"
                    min={new Date().toISOString().split("T")[0]}
                    max={check}
                    type="date"
                    onChange={(e) => setCheckIn(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    required
                  />
                  To:{" "}
                  <input
                    id="check-out"
                    className="input-date"
                    min={convertDateToSpecificFormat(checkin)}
                    max={maxAllowedCheckout()}
                    type="date"
                    disabled={!checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    required
                  />
                </div>
                <div>
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
      </div>

      {!clicked ? (
        <div></div>
      ) : (
        <div style={{ margin: "2rem" }}>
          <h6 style={{ marginLeft: "5%" }}>Select Hall</h6>
          <hr />
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            allHalls?.halls.filter((hall)=>hall.category === hallType).map((item)=>(
              Object.keys(availability).includes(item.category) && availability[item.category] > 0) && (
                        <HallDetailsCard
                    key={item._id}
                    hallData={item}
                    checkin={checkin}
                    checkout={checkout}
                    availability={availability}
                  />
              )
            ))
          }
        </div>
      )}
    </header>
  );
};

export default Halls;
