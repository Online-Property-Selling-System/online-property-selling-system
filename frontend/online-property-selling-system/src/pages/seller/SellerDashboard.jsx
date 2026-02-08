import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getSellerProperties,
  deleteProperty,
} from "../../services/propertyService";

function SellerDashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [properties, setProperties] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);

  /* ================= FETCH PROPERTIES ================= */
  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProperties = async () => {
      try {
        const data = await getSellerProperties(userId);
        setProperties(data);
      } catch (err) {
        toast.error("Failed to load properties");
      }
    };

    fetchProperties();
  }, [userId, navigate]);

  /* ================= STATS ================= */
  const totalListings = properties.length;
  const approvedListings = properties.filter(
    (p) => p.status === "APPROVED"
  ).length;
  const bookedListings = properties.filter(
    (p) => p.status === "BOOKED"
  ).length;
  const totalInquiries = properties.reduce(
    (sum, p) => sum + (p.inquiries || 0),
    0
  );

  /* ================= DELETE ================= */
  const confirmDelete = (propertyId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="fw-semibold mb-2">Delete this property?</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                try {
                  await deleteProperty(propertyId);
                  setProperties((prev) =>
                    prev.filter((p) => p.propertyId !== propertyId)
                  );
                  toast.success("Property deleted successfully");
                } catch {
                  toast.error("Delete failed");
                }
                closeToast();
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const sellerName =
    localStorage.getItem("email") || "Seller";




  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="container mb-5">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">Seller Dashboard</h4>
            <small className="text-muted">{sellerName}</small>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="row mb-4">
          <StatCard title="Total Listings" value={totalListings} icon="house-door" />
          <StatCard
            title="Approved Listings"
            value={approvedListings}
            icon="check-circle-fill"
            color="success"
          />
          <StatCard
            title="Booked Properties"
            value={bookedListings}
            icon="calendar-check"
            color="warning"
            onClick={() => navigate("/seller/bookings")}
          />

          <StatCard
            title="Total Inquiries"
            value={totalInquiries}
            icon="chat-dots-fill"
            color="primary"
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="card shadow-sm">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">My Property Listings</h5>
              <Link to="/seller/add-property" className="btn btn-dark btn-sm">
                + Add New Property
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Purpose</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Inquiries</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {properties.map((p) => (
                    <tr key={p.propertyId}>
                      <td>{p.propertyId}</td>


                      <td>

                        <span
                          className={`badge bg-${p.listType === "SALE" ? "primary" : "info"
                            }`}
                        >
                          {p.listType === "SALE" ? "BUY" : "RENT"}
                        </span>
                      </td>

                      {console.log("images from backend:", p.images)}




                      <td>{p.title}</td>
                      <td>{p.location}</td>

                      <td>
                        ₹{p.price.toLocaleString()}
                        {p.listType === "RENT" && (
                          <small className="text-muted"> / month</small>
                        )}
                      </td>


                      <td>
                        <span
                          className={`badge bg-${p.status === "APPROVED"
                            ? "success"
                            : p.status === "PENDING"
                              ? "warning text-dark"
                              : p.status === "BOOKED"
                                ? "info"
                                : "secondary"
                            }`}
                        >
                          {p.status}
                        </span>

                      </td>

                      <td>{p.inquiries || 0}</td>

                      <td>
                        {/* VIEW IMAGES */}
                        <button
                          className="btn btn-outline-secondary btn-sm me-1"
                          onClick={() => {
                            if (!p.images || p.images.length === 0) {
                              toast.info("No images available for this property");
                              return;
                            }
                            setSelectedImages(p.images);
                          }}

                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        {console.log("images from backend:", p.images)}

                        {/* EDIT */}
                        <button
                          className="btn btn-outline-secondary btn-sm me-1"
                          onClick={() =>
                            navigate(`/seller/edit-property/${p.propertyId}`)
                          }
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        {/* DELETE */}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => confirmDelete(p.propertyId)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>

      </div>

      {/* ================= IMAGE MODAL ================= */}
      {selectedImages && (
        <ImageModal
          images={selectedImages}
          onClose={() => setSelectedImages(null)}
        />
      )}
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function StatCard({ title, value, icon, color = "secondary", onClick }) {
  return (
    <div className="col-md-3">
      <div
        className="card shadow-sm p-3"
        style={{ cursor: onClick ? "pointer" : "default" }}
        onClick={onClick}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>
            <h4 className="fw-bold mb-0">{value}</h4>
          </div>
          <div className={`bg-${color} bg-opacity-10 rounded-circle p-3`}>
            <i className={`bi bi-${icon} text-${color} fs-5`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageModal({ images, onClose }) {
  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Property Images</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body d-flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={`data:image/jpeg;base64,${img}`}
                alt="property"
                className="img-fluid rounded"
                style={{ width: "48%" }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
