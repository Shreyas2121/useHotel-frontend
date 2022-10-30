import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

// import Home from "./pages/Home";
// import AboutUs from "./pages/AboutUs";
// import Rooms from "./pages/Rooms";
// import Halls from "./pages/Halls";
// import { BookingForm } from "./pages/BookingDetails/BookingForm";
// import AddReview from "./pages/Reviews/AddReview";
// import { Checkbooking } from "./pages/Checkbooking";
// import ConfirmDetails from "./pages/success/ConfirmDetails";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Rooms = lazy(() => import("./pages/Rooms"));
const Halls = lazy(() => import("./pages/BookHall"));
const BookingForm = lazy(() => import("./pages/BookingDetails/BookingForm"));
const AddReview = lazy(() => import("./pages/Reviews/AddReview"));
const Checkbooking = lazy(() => import("./pages/Checkbooking"));
const ConfirmDetails = lazy(() => import("./pages/success/ConfirmDetails"));

function App() {
  const location = useLocation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);
  }, [location]);

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <LoadingBar
        color="#f11946"
        loaderSpeed={1000}
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
        transitionTime={1000}
      />
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="halls" element={<Halls />} />
          <Route path="bookings" element={<BookingForm />} />
          <Route path="booking/success" element={<ConfirmDetails />} />
          <Route path="addreview" element={<AddReview />} />
          <Route path="checkbooking" element={<Checkbooking />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
