import "./About.css";

function About() {
  const team = [
    "Ansh Patel",
    "Suyash Shrivastava", 
    "Radhe Shyam Ambhore",
    "Aryan Kesharwani"
  ];

  return (
    <div className="about-page-wrapper">
      {/* Background Decorative Elements */}
      <div className="bg-glow top-left"></div>
      <div className="bg-glow bottom-right"></div>

      <div className="container py-5 position-relative">
        {/* HERO SECTION */}
        <div className="text-center mb-5 animate-fade-in">
          <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 border border-primary border-opacity-20 uppercase tracking-widest">
            Our Mission
          </span>
          <h1 className="display-3 fw-bold text-white mb-4">
            About <span className="text-primary">PropertyHub</span>
          </h1>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="lead text-secondary opacity-75 leading-relaxed">
                PropertyHub is a modern real-estate ecosystem designed to bridge the gap between 
                dream homes and genuine sellers. Built with precision, we focus on verified listings 
                and seamless user experiences.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT GLASS CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <div className="icon-box mb-3">
                <i className="bi bi-rocket-takeoff h3 text-primary"></i>
              </div>
              <h4 className="text-white fw-bold">Innovation First</h4>
              <p className="text-secondary small">
                Applying real-world concepts of full-stack development and modular architecture 
                to create a scalable system inspired by modern enterprise platforms.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <div className="icon-box mb-3">
                <i className="bi bi-shield-check h3 text-primary"></i>
              </div>
              <h4 className="text-white fw-bold">Quality & Trust</h4>
              <p className="text-secondary small">
                Focused on providing a clean user experience, verified property listings, and 
                efficient navigation for buyers, sellers, and administrators.
              </p>
            </div>
          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="glass-card p-5 text-center mt-5">
          <h2 className="text-white fw-bold mb-4">The Project Team</h2>
          <div className="team-grid mb-4">
            {team.map((name, index) => (
              <div key={index} className="team-member-chip">
                {name}
              </div>
            ))}
          </div>
          
          <div className="divider-glow my-4"></div>

          <div className="batch-details">
            <h5 className="text-primary fw-bold mb-1">PG-DAC Students</h5>
            <p className="text-white opacity-75 mb-0">Sunbeam Institute of Information Technology, Karad</p>
            <p className="text-secondary small tracking-wider">August 2025 – February 2026</p>
          </div>
        </div>

        <p className="text-center text-secondary small mt-5 opacity-50 px-lg-5">
          This project reflects our collective effort to understand and implement modern web technologies, 
          software design principles, and best practices followed in the industry.
        </p>
      </div>
    </div>
  );
}

export default About;