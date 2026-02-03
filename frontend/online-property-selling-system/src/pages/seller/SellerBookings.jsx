import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getBookingsBySeller,
  updateBookingStatus,
} from "../../services/bookingService";

function SellerBookings() {
  const sellerId = Number(localStorage.getItem("userId"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!sellerId) return;

    const loadBookings = async () => {
      try {
        const data = await getBookingsBySeller(sellerId);
        setBookings(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      }
    };

    loadBookings();
  }, [sellerId]);

  /* ---------- APPROVE ---------- */
  const approveBooking = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "BOOKED");

      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId
            ? { ...b, status: "BOOKED" }
            : b
        )
      );

      toast.success("Booking approved");
    } catch (err) {
      toast.error("Failed to approve booking");
    }
  };

  /* ---------- REJECT ---------- */
  const rejectBooking = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "REJECTED");

      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId
            ? { ...b, status: "REJECTED" }
            : b
        )
      );

      toast.success("Booking rejected");
    } catch (err) {
      toast.error("Failed to reject booking");
    }
  };

  return (
    <div style={{ paddingTop: "72px" }} className="container">
      <h4 className="fw-bold mb-4">Booked Properties</h4>

      {bookings.length === 0 && (
        <p className="text-muted">No bookings available</p>
      )}

      {bookings.map((b) => (
        <div key={b.bookingId} className="card shadow-sm mb-3">
          <div className="row g-0">

            {/* IMAGE */}
            <div className="col-md-4">
              <img
                src={
                  b.propertyImage
                    ? `data:image/jpeg;base64,${b.propertyImage}`
                    : "https://via.placeholder.com/300"
                }
                className="img-fluid h-100 rounded-start"
                style={{ objectFit: "cover" }}
                alt="property"
              />
            </div>

            {/* DETAILS */}
            <div className="col-md-8">
              <div className="card-body">

                {/* TITLE + STATUS / ACTIONS */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">{b.propertyTitle}</h6>

                  {b.status === "PENDING" ? (
                    <div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => approveBooking(b.bookingId)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectBooking(b.bookingId)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`badge ${
                        b.status === "BOOKED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {b.status}
                    </span>
                  )}
                </div>

                <p className="text-muted mb-1">
                  📍 {b.propertyLocation}
                </p>
                <p className="mb-1">Buyer: {b.buyerName}</p>
                <p className="mb-1">Email: {b.buyerEmail}</p>
                <p className="mb-2">Phone: {b.buyerPhone}</p>

              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default SellerBookings;
