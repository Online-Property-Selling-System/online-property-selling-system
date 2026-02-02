import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";

import EditProperty from "./pages/seller/EditProperty";
import AddProperty from "./pages/seller/AddProperty";
import MyProperties from "./pages/seller/MyProperties";
import Inquiries from "./pages/seller/Inquiries";
import SellerBookings from "./pages/seller/SellerBookings";

import Messages from "./pages/buyer/Messages";
import SearchProperties from "./pages/buyer/SearchProperties";
import PropertyDetails from "./pages/buyer/PropertyDetails";
import MyBookings from "./pages/buyer/MyBookings";
import ContactSeller from "./pages/buyer/ContactSeller";
import Wishlist from "./pages/buyer/WishList";
import About from "./pages/About";
import Rent from "./pages/Rent";
import Sell from "./pages/Sell";
import ApproveListings from "./pages/admin/ApproveListings";

function App() {
  // ---- GLOBAL WISHLIST STATE ----
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Sync whenever localStorage changes from other parts
  useEffect(() => {
    const handler = () => {
      setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <BrowserRouter>
      {/* PASS WISHLIST COUNT TO NAVBAR */}
      <Navbar wishlistCount={wishlist.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sell" element={<Sell />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />

        <Route path="/seller/add-property" element={<AddProperty />} />
        <Route path="/seller/edit-property/:id" element={<EditProperty />} />
        <Route path="/seller/my-properties" element={<MyProperties />} />
        <Route path="/seller/inquiries" element={<Inquiries />} />
        <Route path="/seller/bookings" element={<SellerBookings />} />


        {/* PASS SETTER TO SEARCH PAGE */}
        <Route
          path="/buyer/search"
          element={<SearchProperties setWishlist={setWishlist} />}
        />

        <Route path="/buyer/property-details" element={<PropertyDetails />} />
        <Route path="/buyer/property-details/:id" element={<PropertyDetails />} />
        <Route path="/buyer/messages" element={<Messages />} />
        <Route path="/buyer/bookings" element={<MyBookings />} />
        <Route path="/buyer/contact-seller" element={<ContactSeller />} />
        
        <Route path="/admin/approve-listings" element={<ApproveListings />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
