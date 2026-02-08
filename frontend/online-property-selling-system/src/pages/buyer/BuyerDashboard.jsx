import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookingsByBuyer } from "../../services/bookingService";

function BuyerDashboard() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);

  const loadWishlist = () => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  };

  useEffect(() => {
    loadWishlist();
    const handler = () => loadWishlist();
    window.addEventListener("wishlistUpdated", handler);
    return () => window.removeEventListener("wishlistUpdated", handler);
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      navigate("/login", { replace: true });
    };
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  useEffect(() => {
    const buyerId = localStorage.getItem("userId");
    if (!buyerId) return;

    const loadBookings = async () => {
      try {
        const data = await getBookingsByBuyer(buyerId);
        setBookings(data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };

    loadBookings();
  }, []);

  const sellerName = localStorage.getItem("email") || "Seller";

  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="container mb-5">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">Dashboard</h4>
            <small className="text-muted">{sellerName}</small>
          </div>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          <StatCard icon="heart" title="Saved Homes" value={wishlist.length} />
          <StatCard icon="calendar-check" title="Pending Bookings" value="3" />
          <StatCard icon="chat-dots" title="Messages" value="5" />
        </div>

        {/* SAVED HOMES */}
        <div className="card shadow-sm p-4 mb-4">
          <h6 className="fw-bold mb-3">Saved Homes</h6>

          {wishlist.length === 0 ? (
            <p className="text-muted mb-0">No saved homes yet. Start browsing!</p>
          ) : (
            <div className="row g-3">
              {wishlist.map((home) => (
                <div className="col-md-4" key={home.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={home.img}
                      alt={home.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />

                    <div className="card-body">
                      <h6 className="fw-semibold mb-1">{home.title}</h6>
                      <small className="text-muted">{home.city}, Maharashtra</small>

                      <p className="fw-bold mt-2 mb-2">
                        ₹{home.price.toLocaleString("en-IN")}
                      </p>

                      <div className="d-flex justify-content-between">
                        <Link
                          to={`/buyer/property-details/${home.id}`}
                          className="btn btn-dark btn-sm"
                        >
                          View Details
                        </Link>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromWishlist(home.id)}
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MY BOOKINGS */}
        <div className="card shadow-sm p-4">
          <h6 className="fw-bold mb-3">My Bookings</h6>

          <div className="row g-3">
            {bookings.length === 0 ? (
              <p className="text-muted mb-0">No bookings found</p>
            ) : (
              bookings.map(b => (
                <BookingCard
                  key={b.bookingId}
                  propertyId={b.propertyId}   // ✅ ADD THIS LINE
                  img={b.propertyImage ? `data:image/jpeg;base64,${b.propertyImage}` : "https://via.placeholder.com/150"}
                  title={`${b.propertyTitle}, ${b.propertyLocation}`}
                  seller={b.sellerName}
                  status={b.status}
                  
                  statusColor={
                    b.status === "BOOKED"
                      ? "success"     // ✅ Approved → Green
                      : b.status === "REJECTED"
                        ? "danger"    // ❌ Rejected → Red
                        : "warning"   // ⏳ Pending → Yellow
                  }
                  

                />
              ))

            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ icon, title, value }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm p-3 h-100">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center"
            style={{ width: "44px", height: "44px" }}>
            <i className={`bi bi-${icon}`}></i>
          </div>
          <div>
            <small className="text-muted">{title}</small>
            <h5 className="fw-bold mb-0">{value}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ img, title, seller, status, statusColor, propertyId }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/buyer/property-details/${propertyId}`);
    }
    
  };

  return (
    <div className="col-md-6">
      <div className="card shadow-sm p-3 d-flex flex-row gap-3 align-items-center">
        <img
          src={img}
          alt="booking"
          style={{ width: "90px", height: "70px", objectFit: "cover", borderRadius: "6px" }}
        />

        <div className="flex-grow-1">
          <h6 className="mb-1 fw-semibold">{title}</h6>
          <small className="text-muted">Seller: {seller}</small>
          <br />
          <span className={`badge bg-${statusColor} mt-1`}>{status}</span>
        </div>

        <button onClick={handleViewDetails} className="btn btn-outline-dark btn-sm">
          View Details
        </button>
      </div>
    </div>
  );
}

export default BuyerDashboard;
