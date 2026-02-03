import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProperties } from "../../services/propertyService";
import "./search.css";

function SearchProperties() {

  const [allProps, setAllProps] = useState([]);
  const [filteredProps, setFilteredProps] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    budget: ""
  });

  const [wishlist, setWishlist] = useState([]);

  /* ---------------- LOAD PROPERTIES FROM API ---------------- */
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await getAllProperties();

        const mapped = data.map(p => ({
          id: p.propertyId,
          title: p.title,
          city: p.location,
          price: p.price,
          type: p.propertyType,
          listType: p.listType, // ✅ RENT / SELL
          img: p.images?.length
            ? `data:image/jpeg;base64,${p.images[0]}`
            : "https://via.placeholder.com/400",
          tag: p.listType === "RENT" ? "For Rent" : "For Sale"
        }));

        setAllProps(mapped);
        setFilteredProps(mapped);
      } catch (err) {
        console.error("Failed to load properties", err);
      }
    };

    loadProperties();
  }, []);

  /* ---------------- WISHLIST ---------------- */
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);

    const sync = () =>
      setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);

    window.addEventListener("storage", sync);
    window.addEventListener("wishlistUpdated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wishlistUpdated", sync);
    };
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    let result = [...allProps];

    if (filters.location)
      result = result.filter(p =>
        p.city.toLowerCase().includes(filters.location.toLowerCase())
      );

    if (filters.type)
      result = result.filter(p => p.type === filters.type);

    if (filters.budget) {
      if (filters.budget === "under50") result = result.filter(p => p.price <= 5000000);
      if (filters.budget === "50to1cr") result = result.filter(p => p.price >= 5000000 && p.price <= 10000000);
      if (filters.budget === "above1cr") result = result.filter(p => p.price >= 10000000);
    }

    setFilteredProps(result);
  };

  const toggleWishlist = (property) => {
    let stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = stored.some(item => item.id === property.id);

    if (exists) stored = stored.filter(item => item.id !== property.id);
    else stored.push(property);

    localStorage.setItem("wishlist", JSON.stringify(stored));
    setWishlist(stored);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const isWishlisted = (id) => wishlist.some(item => item.id === id);

  const formatPrice = (num) => "₹" + num.toLocaleString("en-IN");

  return (
    <div className="search-page-bg" style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Find Your Dream Home</h2>
          <p className="text-muted">
            Explore {filteredProps.length}+ properties in premium locations
          </p>
        </div>

        {/* FILTER BAR (UNCHANGED) */}
        {/* --- same code --- */}

        {/* PROPERTY CARDS */}
        <div className="row g-4 mb-5">
          {filteredProps.map((p) => (
            <div className="col-lg-4 col-md-6" key={p.id}>
              <div className="property-card-v2 card h-100 border-0 shadow-sm overflow-hidden">

                <div className="position-relative overflow-hidden" style={{ height: "240px" }}>
                  <img src={p.img} className="card-img-top h-100 w-100 object-fit-cover" alt={p.title} />

                  {/* 🔹 LIST TYPE BADGE (ONLY ADDITION) */}
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge glass-badge px-3 py-2 rounded-pill">
                      {p.listType === "RENT" ? "🏠 Rent" : "🏷 Sale"}
                    </span>
                  </div>

                  <button className="wishlist-btn" onClick={() => toggleWishlist(p)}>
                    <i className={`bi ${isWishlisted(p.id) ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                  </button>
                </div>

                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold mb-0">{p.title}</h5>
                    <span className="text-primary fw-bold h5 mb-0">
                      {formatPrice(p.price)}
                    </span>
                  </div>

                  <p className="text-muted small mb-3">
                    <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                    {p.city}, Maharashtra
                  </p>

                  <Link
                    to={`/buyer/property-details/${p.id}`}
                    className="btn btn-dark rounded-3 px-4 btn-sm fw-bold"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default SearchProperties;
