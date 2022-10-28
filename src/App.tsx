import "./App.css";
import NavBar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer/Footer";
import Rooms from "./pages/Rooms";
import Halls from "./pages/Halls";
import { BookingDetails } from "./pages/BookingDetails/BookingDetails";
import AddReview from "./pages/Reviews/AddReview";
import { Checkbooking } from "./pages/Checkbooking";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ConfirmDetails from "./pages/success/ConfirmDetails";

function App() {
  return (
    <div>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="booking/room" element={<Rooms />} />
        <Route path="booking/hall" element={<Halls />} />
        <Route path="booking" element={<BookingDetails />} />
        <Route path="booking/success" element={<ConfirmDetails />} />
        <Route path="addreview" element={<AddReview />} />
        <Route path="checkbooking" element={<Checkbooking />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
