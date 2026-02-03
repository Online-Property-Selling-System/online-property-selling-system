import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Sell() {
  return (
    <div className="bg-white overflow-hidden" style={{ paddingTop: "100px" }}>
      <div className="container mb-5">
        {/* HERO SECTION */}
        <div className="row align-items-center mb-5 py-lg-5">
          {/* LEFT CONTENT */}
          <div className="col-lg-6 pe-lg-5 text-start">
            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 border border-primary border-opacity-20 uppercase tracking-wider">
              For Property Owners
            </span>
            <h1 className="fw-bold display-4 mb-4" style={{ lineHeight: '1.2' }}>
              Want to <span className="text-primary">Sell Your Property</span> With Us?
            </h1>
            <p className="lead text-secondary mb-4 opacity-75">
              Join thousands of trusted sellers on PropertyHub. We connect you 
              directly with genuine buyers, ensuring faster closings and higher returns.
            </p>

            <div className="row g-3 mb-5">
              {[
                { icon: "bi-shield-check", text: "Verified & Trusted Buyers" },
                { icon: "bi-lightning-charge", text: "Fast Property Approval" },
                { icon: "bi-person-badge", text: "Direct Buyer Inquiries" },
                { icon: "bi-graph-up-arrow", text: "Market Value Insights" }
              ].map((item, idx) => (
                <div key={idx} className="col-md-6">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                      <i className={`bi ${item.icon} small`}></i>
                    </div>
                    <span className="text-dark fw-medium small">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex gap-3">
              <Link to="/login" className="btn btn-primary btn-lg px-4 py-3 shadow-lg text-decoration-none">
                Login as Seller
              </Link>
              <Link to="/register" className="btn btn-outline-dark btn-lg px-4 py-3 text-decoration-none">
                Register Now
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="position-relative">
              <div className="position-absolute top-0 end-0 translate-middle-y bg-primary opacity-10 rounded-circle" style={{ width: '300px', height: '300px', filter: 'blur(80px)' }}></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
                alt="Modern Architecture"
                className="img-fluid rounded-4 shadow-2xl position-relative"
                style={{ border: '12px solid #fff', zIndex: 1 }}
              />
              <div className="position-absolute bottom-0 end-0 p-4 m-3 bg-white shadow-lg rounded-4 d-none d-md-block" style={{ zIndex: 2 }}>
                 <div className="d-flex align-items-center gap-3">
                    <div className="bg-success text-white rounded-circle p-2 px-3">
                        <i className="bi bi-check-lg h4 mb-0"></i>
                    </div>
                    <div>
                        <h6 className="fw-bold mb-0">Admin Approved</h6>
                        <small className="text-muted">Quality Guaranteed</small>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">How Selling Works</h2>
                <p className="text-muted">Three simple steps to list and sell your home</p>
            </div>
            
            <div className="row g-4">
                {[
                    { 
                      step: "01", 
                      title: "Register Account", 
                      desc: "Create a verified seller profile to start listing properties.",
                      icon: "bi-person-plus"
                    },
                    { 
                      step: "02", 
                      title: "Add Property", 
                      desc: "Upload photos and details. Our admin team will verify the listing.",
                      icon: "bi-house-add"
                    },
                    { 
                      step: "03", 
                      title: "Get Inquiries", 
                      desc: "Receive direct messages and calls from interested buyers.",
                      icon: "bi-chat-left-dots"
                    }
                ].map((item, idx) => (
                    <div className="col-md-4" key={idx}>
                        <div className="card h-100 border-0 shadow-sm p-4 rounded-4 text-center transition-card">
                            <div className="d-flex justify-content-center mb-3">
                                <div className="bg-light text-primary h1 rounded-4 p-3 mb-0" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <i className={`bi ${item.icon} mx-auto`}></i>
                                </div>
                            </div>
                            <span className="text-primary fw-bold small opacity-50 mb-2 d-block">STEP {item.step}</span>
                            <h5 className="fw-bold">{item.title}</h5>
                            <p className="text-muted small px-lg-4">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-5 p-5 rounded-4 text-center text-white" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
            <h3 className="fw-bold mb-3">Ready to find a buyer?</h3>
            <p className="opacity-75 mb-4">Join 5,000+ sellers who have successfully sold properties with PropertyHub.</p>
            <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold border-0">
                Get Started Today
            </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sell;