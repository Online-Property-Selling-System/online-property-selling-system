import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const storedRole = localStorage.getItem("role");
  const role = storedRole ? storedRole.toLowerCase() : "guest";

  const [wishlistCount, setWishlistCount] = useState(0);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (role === "buyer") {
      const list = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(list.length);

      const handler = () => {
        const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistCount(updated.length);
      };

      window.addEventListener("wishlistUpdated", handler);
      return () => window.removeEventListener("wishlistUpdated", handler);
    }
  }, [role]);

  const goToDashboard = () => {
    if (role === "buyer") navigate("/buyer");
    else if (role === "seller") navigate("/seller");
    else if (role === "admin") navigate("/admin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top adani-navbar">
      <div className="container-fluid px-5">

        {/* LOGO */}
        <div
  className="navbar-brand fw-bold d-flex align-items-center gap-2"
  onClick={() => {
    if (role === "buyer") navigate("/");
    else if (role === "seller") navigate("/seller");
    else if (role === "admin") navigate("/admin");
    else navigate("/"); // guest
  }}
  style={{ cursor: "pointer" }}
>
  <i className="bi bi-house-door-fill fs-4"></i>
  PropertyHub
</div>


        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSE */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto">
            {(role === "guest" ) && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/buy">Buy</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rent">Rent</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sell">Sell</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </>
            )}
            {(role === "buyer") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/buy">Buy</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rent">Rent</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </>
            )}

            {(role === "seller" ) && (
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            )}
          </ul>

          {/* CENTER DASHBOARD */}
          {(role === "buyer" || role === "seller" ) && (
            <div className="mx-auto">
              <button
                onClick={goToDashboard}
                className="btn btn-dashboard d-flex align-items-center gap-2"
              >
                <i className="bi bi-speedometer2"></i>
                Dashboard
              </button>
            </div>
          )}

          {/* RIGHT MENU */}
          <ul className="navbar-nav ms-auto align-items-center">

            {role === "buyer" && (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link position-relative" to="/wishlist">
                    <i className="bi bi-heart fs-5"></i>
                    {wishlistCount > 0 && (
                      <span className="wishlist-badge">{wishlistCount}</span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-light btn-sm">
                    Logout
                  </button>
                </li>
              </>
            )}

            {role === "seller" && (
              <li className="nav-item">
                <button onClick={logout} className="btn btn-outline-light btn-sm">
                  Logout
                </button>
              </li>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <button onClick={logout} className="btn btn-outline-light btn-sm">
                  Logout
                </button>
              </li>
            )}

            {role === "guest" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn btn-outline-light btn-sm" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;