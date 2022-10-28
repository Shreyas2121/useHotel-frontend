import { UseFetch } from "../../customHook/UseFetch";
import { Review } from "../../types/types";

import { Rating } from "@mui/material";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { Carousel } from "react-bootstrap";
import {useEffect} from "react";
import Person from "../../assets/images/person.png";
import "./slider.css";
import "./roomcards.css";

interface Res {
  data: {
    Review: Review[];
  };
  loading: boolean;
}

const Reviewcards = ({ featured }) => {
  const { data, loading }: Res = UseFetch(
    `reviews${featured}`


  );
  console.log(data); // this is the data that is being fetched from the backend

  return (
    <MDBContainer
      fluid
      style={{
        height: "40rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <br />
        <MDBTypography
          tag="h1"
          className="mb-0"
          style={{ color: "black", fontWeight: "bold" }}
        >
          Testimonial from our customers
        </MDBTypography>
        <MDBTypography tag="small" className="text-muted">
          Who are in extremely love with our best in class hospitality.
        </MDBTypography>
      </div>

      <div>
        <div
          id="carouselMultiItemExample"
          className="carousel slide carousel-dark text-center"
          data-mdb-ride="carousel"
        >
          <Carousel>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              data?.Review?.map((review_data) => (
                console.log(review_data), // this is the data that is being fetched from the backend
                console.log(review_data),
                <Carousel.Item>
                  <div className="carousel-inner py-4">
                    <div className="carousel-item active" style={{}}>
                      <div
                        className="container"
                        style={{
                          height: "25rem",
                        }}
                      >
                        <div className="row">
                          <div
                            className="col-lg-14 shadow-4-strong"
                            id="review-cards"
                          >
                            <img
                              className="rounded-circle shadow-1-strong mb-4"
                              src={Person}
                              alt="avatar"
                              style={{ width: "10%" }}
                            />
                            <h5 className="Review-name">{review_data.name}</h5>
                            <p>
                              <Rating
                                name="read-only"
                                value={review_data.rating}
                                readOnly
                              />{" "}
                            </p>
                            <p className="review-text">
                              <i className="fas fa50%-quote-left pe-2"></i>
                              {review_data.review}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))
            )}
          </Carousel>
        </div>
      </div>
    </MDBContainer>
  );
};

export default Reviewcards;
