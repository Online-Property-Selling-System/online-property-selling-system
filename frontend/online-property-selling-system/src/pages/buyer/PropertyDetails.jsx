import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./details.css";
import { getPropertyDetails } from "../../services/propertyService";
import { bookProperty } from "../../services/bookingService";
import { toast } from "react-toastify";
function PropertyDetails() {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const [property, setProperty] = useState(null);
  const [viewer, setViewer] = useState({ open: false, img: "" });

  /* ================= AUTH + API ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    getPropertyDetails(propertyId)
      .then(data => setProperty(data))
      .catch(() => alert("Failed to load property details"));
  }, [propertyId, navigate]);

  if (!property) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  /* ================= SHARE PDF ================= */
  const handleShare = async () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(property.title, 10, 20);
    pdf.setFontSize(12);
    pdf.text(`Location: ${property.address}`, 10, 35);
    pdf.text(`Price: ₹${property.price}`, 10, 45);
    pdf.text(`Seller: ${property.sellerName}`, 10, 55);

    const blob = pdf.output("blob");
    const file = new File([blob], "property_details.pdf", { type: "application/pdf" });

    if (navigator.share) {
      navigator.share({ title: property.title, files: [file] }).catch(() => { });
    } else {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "property_details.pdf";
      a.click();
    }
  };

  /* ================= BOOK VISIT ================= */
  const handleBooking = () => {
    const booking = {
      title: property.title,
      seller: property.sellerName,
      location: property.address,
      date: new Date().toLocaleString()
    };

    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    stored.push(booking);
    localStorage.setItem("bookings", JSON.stringify(stored));

    alert("Site visit request sent to seller!");
  };

  const handleBookProperty = async () => {
  try {
    const buyerId = localStorage.getItem("userId"); // IMPORTANT

    if (!buyerId) {
      toast.error("Please login again");
      navigate("/login");
      return;
    }

    await bookProperty(property.propertyId, buyerId);

    toast.success("Property booking request sent!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to book property");
  }
};


  return (
    <div className="bg-light-subtle" style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container mb-5">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small mb-2">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">Home</Link>
                </li>
                <li className="breadcrumb-item active text-muted">
                  {property.location}
                </li>
              </ol>
            </nav>

            <h2 className="fw-bold mb-1">{property.title}</h2>
            <p className="text-muted mb-0">
              <i className="bi bi-geo-alt me-1"></i> {property.address}
            </p>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-white shadow-sm rounded-circle p-2 px-3" onClick={handleShare}>
              <i className="bi bi-share"></i>
            </button>
            <button className="btn btn-white shadow-sm rounded-circle p-2 px-3 text-danger">
              <i className="bi bi-heart"></i>
            </button>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <div className="main-img-container shadow-sm overflow-hidden rounded-4 h-100">
              <img
                src={`data:image/jpeg;base64,${property.images?.[0]}`}
                className="img-fluid w-100 h-100 object-fit-cover hover-zoom"
                onClick={() => setViewer({ open: true, img: property.images[0] })}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex flex-column gap-3 h-100">
              {property.images?.slice(1).map((img, i) => (
                <div key={i} className="side-img-container shadow-sm overflow-hidden rounded-4 h-50">
                  <img
                    src={`data:image/jpeg;base64,${img}`}
                    className="w-100 h-100 object-fit-cover hover-zoom"
                    onClick={() => setViewer({ open: true, img })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
              <h5 className="fw-bold mb-4">Overview</h5>

              <h6 className="fw-bold mt-2">Description</h6>
              <p className="text-muted">{property.description}</p>
            </div>

            {/* MAP (UNCHANGED) */}
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
              <h5 className="fw-bold mb-3">Location & Neighborhood</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.365314782976!2d73.78018331489332!3d18.55755108738734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf36f90d563d%3A0x6e3923f663f707f5!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2in"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg p-4 rounded-4 mb-4 action-card text-white">
              <small>Asking Price</small>
              <h2 className="fw-bold mb-4">₹{property.price}</h2>

              <button onClick={handleBooking} className="btn btn-light w-100 mb-3 py-3 fw-bold">
                Book Site Visit
              </button>

              <button
                onClick={handleBookProperty}
                className="w-100 mb-3 py-3 fw-bold rounded-3 shadow-sm border-0"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(4px)"
                }}
              >
                Book Property
              </button>



              <button
                onClick={() => navigate("/buyer/messages")}
                className="btn btn-outline-light w-100 py-3 fw-bold">
                Message Seller
              </button>
            </div>

            <div className="card border-0 shadow-sm p-4 rounded-4">
              <h6 className="fw-bold mb-3">Property Agent</h6>
              <h6 className="fw-bold mb-0">{property.sellerName}</h6>
              <small className="text-muted">Verified Consultant</small>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE VIEWER */}
      {viewer.open && (
        <div
          onClick={() => setViewer({ open: false, img: "" })}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          <img
            src={`data:image/jpeg;base64,${viewer.img}`}
            style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default PropertyDetails;
