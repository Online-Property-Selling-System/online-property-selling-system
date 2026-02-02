import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFilteredApprovedProperties } from "../services/propertyService";
import { useNavigate } from "react-router-dom";
function PropertyListing({ type, title, subtitle }) {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        location: "",
        type: "",
        bhk: "",
        range: ""
    });

    /* 🔹 LOAD DATA */
    const loadProperties = async () => {
        const params = { type };

        if (filters.location) params.location = filters.location;
        if (filters.type) params.propertyType = filters.type;
        if (filters.bhk) params.bhk = parseInt(filters.bhk);

        if (filters.range === "below15") params.maxPrice = 15000;
        if (filters.range === "15to30") {
            params.minPrice = 15000;
            params.maxPrice = 30000;
        }
        if (filters.range === "30to60") {
            params.minPrice = 30000;
            params.maxPrice = 60000;
        }
        if (filters.range === "above60") params.minPrice = 60000;

        const data = await getFilteredApprovedProperties(params);
        setProperties(data);
    };

    useEffect(() => {
        loadProperties();
    }, []);

    
    return (
        <div style={{ paddingTop: "72px" }}>
            <div className="container mb-5">

                {/* PAGE HEADER (SAME) */}
                <div className="mb-4">
                    <h4 className="fw-bold mb-1">{title}</h4>
                    <small className="text-muted">{subtitle}</small>
                    <hr />
                </div>

                {/* FILTER BAR (100% SAME UI) */}
                <div className="card shadow-sm p-4 mb-4">
                    <div className="row g-3 align-items-end">

                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Location</label>
                            <select className="form-select"
                                onChange={e => setFilters({ ...filters, location: e.target.value })}
                            >
                                <option value="">All Maharashtra</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="Karad">Karad</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-semibold">Property Type</label>
                            <select className="form-select"
                                onChange={e => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="">All Types</option>
                                <option value="APARTMENT">Apartment</option>
                                <option value="HOUSE">House</option>
                                <option value="COMMERCIAL">Commercial</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-semibold">BHK</label>
                            <select className="form-select"
                                onChange={e => setFilters({ ...filters, bhk: e.target.value })}
                            >
                                <option value="">Any</option>
                                <option value="1">1 BHK</option>
                                <option value="2">2 BHK</option>
                                <option value="3">3 BHK</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-semibold">
                                {type === "RENT" ? "Rent Range" : "Price Range"}
                            </label>
                            <select className="form-select"
                                onChange={e => setFilters({ ...filters, range: e.target.value })}
                            >
                                <option value="">Any</option>
                                <option value="below15">Below ₹15,000</option>
                                <option value="15to30">₹15,000 – ₹30,000</option>
                                <option value="30to60">₹30,000 – ₹60,000</option>
                                <option value="above60">Above ₹60,000</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onClick={loadProperties}>
                                Search
                            </button>
                        </div>

                    </div>
                </div>

                {/* PROPERTY CARDS (EXACT SAME DESIGN) */}
                <div className="row g-4">
                    {properties.map(p => (
                        <PropertyCard key={p.propertyId} p={p} type={type} />
                    ))}

                    {properties.length === 0 && (
                        <p className="text-muted text-center">No matching properties found</p>
                    )}
                </div>

            </div>
        </div>
    );
}

/* ---------- SAME CARD UI ---------- */
function PropertyCard({ p, type }) {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const isInWishlist = wishlist.some(item => Number(item.id) === Number(p.propertyId));

  const toggleWishlist = () => {
    const buyerId = localStorage.getItem("userId");
    if (!buyerId) {
      navigate("/login");
      return;
    }

    let stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updatedWishlist = [];

    if (isInWishlist) {
      // remove
      updatedWishlist = stored.filter(item => Number(item.id) !== Number(p.propertyId));
    } else {
      // add
      const newItem = {
        id: p.propertyId,
        title: p.title,
        price: p.price,
        city: p.city || "N/A",
        state: p.state || "Maharashtra",
        img: p.image ? `data:image/jpeg;base64,${p.image}` : null
      };
      updatedWishlist = [...stored, newItem];
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);

    // optional: update navbar count or other listeners
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleViewDetails = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/buyer/property-details/${p.propertyId}`);
    }
  };

  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm position-relative">

        <button
          className={`btn btn-light position-absolute`}
          style={{ top: "10px", right: "10px", borderRadius: "50%" }}
          onClick={toggleWishlist}
        >
          <i className={isInWishlist ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
        </button>

        <img
          src={`data:image/jpeg;base64,${p.image}`}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          alt={p.title}
        />

        <div className="card-body">
          <h6 className="fw-bold mb-1">{p.title}</h6>
          <small className="text-muted d-block mb-1">📍 {p.location}</small>

          <p className="fw-semibold mb-3">
            ₹{p.price.toLocaleString()}
            {type === "RENT" && " / month"}
          </p>

          <button
            onClick={handleViewDetails}
            className="btn btn-outline-primary btn-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}


export default PropertyListing;