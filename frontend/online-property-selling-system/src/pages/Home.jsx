import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [propertyType, setPropertyType] = useState("");
  const [bhk, setBhk] = useState("");
  const [shopSize, setShopSize] = useState("");

  const handlePropertyChange = (e) => {
    setPropertyType(e.target.value);
    setBhk("");
    setShopSize("");
  };

  return (
    <div className="home-page-root bg-white overflow-hidden">

      {/* HERO SECTION */}
      <div
        className="hero-bg text-white"
        style={{ paddingTop: "140px", paddingBottom: "180px" }}
      >
        {/* Dynamic Glow Effects */}
        <div
          className="position-absolute top-0 start-0 translate-middle bg-indigo-glow opacity-20 rounded-circle"
          style={{ width: "600px", height: "600px", filter: "blur(120px)", zIndex: 0 }}
        ></div>

        <div
          className="position-absolute bottom-0 end-0 translate-middle-y bg-purple-glow opacity-10 rounded-circle"
          style={{ width: "400px", height: "400px", filter: "blur(100px)", zIndex: 0 }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center">

            {/* LEFT HERO CONTENT */}
            <div className="col-lg-6">
              <span className="badge rounded-pill bg-white bg-opacity-10 px-3 py-2 mb-3 border border-light">
                ✨ The Future of Real Estate
              </span>

              <h1 className="fw-bold display-3 mb-4" style={{ lineHeight: "1.1" }}>
                Find Your <span className="text-gradient-indigo">Perfect Sanctuary</span>
              </h1>

              <p className="lead text-indigo-gray mb-4">
                Experience a curated selection of elite properties in Pune & Mumbai,
                where luxury meets verified security.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/buyer/search" className="btn btn-golden-outline btn-lg px-5 py-3">
                  Explore Listings
                </Link>

               
              </div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="position-relative hero-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  className="img-fluid rounded-5"
                  alt="Luxury Home"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", objectFit: "cover" }}
                />
                <div className="glass-card-stats position-absolute bottom-0 start-0 p-4 m-3 rounded-4 d-none d-md-block">
                  <p className="small mb-0 opacity-75 text-white">Starting from</p>
                  <h4 className="fw-bold mb-0 text-white">₹40.5 Lakhs</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FLOATING SEARCH CARD */}
      

      {/* STATS SECTION */}
      <div className="container my-5 py-5">
        <div className="row text-center g-4">
          {[
            { label: "Total Listings", val: "10K+" },
            { label: "Happy Families", val: "5K+" },
            { label: "Verified Sellers", val: "120+" },
            { label: "Property Experts", val: "24/7" },
          ].map((stat, i) => (
            <div key={i} className="col-6 col-md-3">
              <h1 className="stat-value mb-1">{stat.val}</h1>
              <p className="text-uppercase small fw-bold text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PROPERTIES */}
      <FeaturedProperties />

      <Footer />
    </div>
  );
}

function FeaturedProperties() {
  const cards = [
    { img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be", title: "Modern Villa", loc: "Karad", price: "38 Lakh" },
    { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", title: "Skyline Apartment", loc: "Pune", price: "65 Lakh" },
    { img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c", title: "Business Hub", loc: "Mumbai", price: "1.2 Cr" },
  ];

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
          <div>
            <h2 className="fw-bold mb-0">Elite Collections</h2>
            <p className="text-muted mb-0">Handpicked masterpieces for your legacy.</p>
          </div>
          <Link to="/buyer/search" className="btn btn-link fw-bold text-decoration-none p-0">
            View All Collections →
          </Link>
        </div>

        <div className="row g-4">
          {cards.map((card, i) => (
            <PropertyCard key={i} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ img, title, loc, price }) {
  return (
    <div className="col-md-4">
      <div className="card property-card-v2 h-100 border-0 overflow-hidden">
        <div className="position-relative overflow-hidden">
          <img src={img} className="card-img-top card-zoom" style={{ height: "280px", objectFit: "cover" }} alt={title} />
          <div className="position-absolute top-0 end-0 m-3 px-3 py-1 bg-white rounded-pill fw-bold small shadow-sm">
            ✓ Verified
          </div>
        </div>
        <div className="card-body p-4 bg-white">
          <p className="text-muted small fw-bold mb-1 text-uppercase">{loc}</p>
          <h4 className="fw-bold mb-3">{title}</h4>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h4 fw-bold">₹{price}</span>
            
            <Link to="/buyer/search" className="btn btn-black rounded-pill px-4 fw-bold">
            Explore
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;