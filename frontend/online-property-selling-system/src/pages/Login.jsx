import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import { _toUpperCase } from './../../node_modules/zod/v4/core/api';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.07)",
    color: "white",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const response = await loginUser(formData);

      const { token, role, email, userId, firstName,lastName } = response.data;

      // ✅ STORE AUTH DATA
      localStorage.setItem("token", token);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("role", role.toUpperCase());
      localStorage.setItem("email", email);
      localStorage.setItem("userId", userId); // ⭐ IMPORTANT

      toast.success("Login successful 🎉");

      // ✅ ROLE BASED REDIRECT
      if (role === "ADMIN") navigate("/admin");
      else if (role === "SELLER") navigate("/seller");
      else if (role === "BUYER") navigate("/buyer");

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Try again.");
      }
    }
  };


  return (
    <div className="auth-page-root" style={{ 
      backgroundColor: "#020617", 
      minHeight: "100vh", 
      width: "100%", 
      position: "relative", 
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* Background Decorative Glows */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)", filter: "blur(100px)", pointerEvents: "none" }}></div>

      {/* TOP NAVIGATION */}
      <div className="container-fluid py-4 px-5 position-relative" style={{ zIndex: 10 }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-white fw-bold mb-0">Property<span style={{ color: "#818cf8" }}>Hub</span></h5>
          <Link to="/" className="text-decoration-none fw-bold" style={{ color: "#818cf8", fontSize: "14px" }}>
            <i className="bi bi-house me-2"></i> Back to Home
          </Link>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center pb-5 position-relative" style={{ zIndex: 10 }}>
        <div className="card border-0 shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "2.5rem", background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>

          <div className="text-center mb-4">
            <div className="mx-auto mb-3 d-flex align-items-center justify-content-center text-white shadow-lg" style={{ width: "68px", height: "68px", borderRadius: "20px", background: "linear-gradient(135deg, #4f46e5, #9333ea)", fontSize: "32px", boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.6)" }}>
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h3 className="fw-bold text-white mb-1">Welcome Back</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            {/* Email Address */}
            <div className="mb-3 text-start">
              <label className="form-label small fw-bold text-uppercase tracking-wider ms-1" style={{ color: "#818cf8" }}>Email Address</label>
              <input
                type="email"
                name="email"
                className={`form-control border-0 py-3 shadow-none custom-input ${errors.email ? 'is-invalid' : ''}`}
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.email && <div className="invalid-feedback ms-2">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-4 text-start">
              <label className="form-label small fw-bold text-uppercase tracking-wider ms-1" style={{ color: "#818cf8" }}>Password</label>
              <input
                type="password"
                name="password"
                className={`form-control border-0 py-3 shadow-none custom-input ${errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.password && <div className="invalid-feedback ms-2">{errors.password}</div>}
            </div>

            <button type="submit" className="btn w-100 text-white fw-bold py-3 shadow border-0" style={{ background: "linear-gradient(135deg, #4f46e5, #4338ca)", borderRadius: "15px", transition: "all 0.3s ease" }}>
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            <p style={{ color: "#94a3b8", fontSize: "14px" }} className="mb-0">
              New to PropertyHub? <Link to="/register" className="fw-bold text-decoration-none" style={{ color: "#818cf8" }}>Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
