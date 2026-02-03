import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[a-zA-Z]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    else if (!nameRegex.test(formData.firstName))
      newErrors.firstName = "Only letters allowed";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(formData.lastName))
      newErrors.lastName = "Only letters allowed";

    if (!formData.phone)
      newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit Indian number";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.role)
      newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: Number(formData.phone),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role.toUpperCase() // ENUM SAFE
    };

    await registerUser(payload);

    toast.success("Registration successful 🎉 Please login");
    navigate("/login", { replace: true });

  } catch (error) {
  if (error.response?.status === 409) {
    toast.error("Email or phone number already registered");
  } else {
    toast.error(
      error.response?.data?.message || "Registration failed"
    );
  }
}
 finally {
    setLoading(false);
  }
};



  return (
    <div
      className="auth-page-root"
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <div className="container-fluid py-4 px-5 position-relative" style={{ zIndex: 10 }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-white fw-bold mb-0">
            Property<span style={{ color: "#818cf8" }}>Hub</span>
          </h5>
          <Link
            to="/login"
            className="text-decoration-none fw-bold"
            style={{ color: "#818cf8", fontSize: "14px" }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center pb-5 position-relative" style={{ zIndex: 10 }}>
        <div
          className="card border-0 shadow-lg p-4"
          style={{
            maxWidth: "440px",
            width: "100%",
            borderRadius: "2rem",
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          {/* Title */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center text-white shadow"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                fontSize: "30px"
              }}
            >
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h3 className="fw-bold text-white mb-1">Create Account</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              Join our premium real-estate network
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className={`form-control border-0 py-2 shadow-none ${errors.firstName ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className={`form-control border-0 py-2 shadow-none ${errors.lastName ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="text-danger small">{errors.lastName}</div>}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                maxLength="10"
                className={`form-control border-0 py-2 shadow-none ${errors.phone ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.phone}
                onChange={(e) => /^\d*$/.test(e.target.value) && handleChange(e)}
              />
              {errors.phone && <div className="text-danger small">{errors.phone}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className={`form-control border-0 py-2 shadow-none ${errors.email ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="text-danger small">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className={`form-control border-0 py-2 shadow-none ${errors.password ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-danger small">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control border-0 py-2 shadow-none ${errors.confirmPassword ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#818cf8" }}>
                Register As
              </label>
              <select
                name="role"
                className={`form-select border-0 py-2 shadow-none ${errors.role ? "is-invalid" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "12px" }}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled style={{ color: "black" }}>Select role</option>
                <option value="BUYER" style={{ color: "black" }}>Buyer</option>
                <option value="SELLER" style={{ color: "black" }}>Seller</option>
              </select>
              {errors.role && <div className="text-danger small">{errors.role}</div>}
            </div>

            {/* Get Started Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-100 text-white fw-bold py-3 shadow border-0"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                borderRadius: "12px",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Creating Account..." : "Get Started"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
