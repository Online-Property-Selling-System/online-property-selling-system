import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    let stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    stored = stored.filter(item => item.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(stored));

    // update navbar count
    window.dispatchEvent(new Event("wishlistUpdated"));

    // update UI
    setWishlist(stored);
  };

  const formatPrice = (num) => {
    if (!num) return "";
    return "₹" + Number(num).toLocaleString("en-IN");
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="container mb-5">

        {/* HEADER */}
        <div className="mb-4">
          <h4 className="fw-bold mb-1">My Wishlist</h4>
          <small className="text-muted">Properties you have saved for later</small>
          <hr />
        </div>

        {/* EMPTY STATE */}
        {wishlist.length === 0 && (
          <div className="text-center text-muted mt-5">
            <i className="bi bi-heart fs-1"></i>
            <p className="mt-2">No properties in wishlist</p>
          </div>
        )}

        {/* WISHLIST CARDS */}
        <div className="row g-4">
          {wishlist.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card h-100 shadow-sm">

                <img
                  src={p.img}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={p.title}
                />

                <div className="card-body">
                  <h6 className="fw-bold mb-1">{p.title}</h6>

                  <small className="text-muted d-block mb-1">
                    📍 {p.city}, Maharashtra
                  </small>

                  <p className="fw-semibold mb-3">{formatPrice(p.price)}</p>

                  <div className="d-flex justify-content-between">
                    <Link
                      to="/buyer/property-details"
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromWishlist(p.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Wishlist;