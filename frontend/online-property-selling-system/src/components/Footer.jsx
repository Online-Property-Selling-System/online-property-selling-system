function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1f2428",
        color: "#ffffff",
        padding: "18px 0",        
        textAlign: "center",
        marginTop: "60px"
      }}
    >
      <h6 className="fw-semibold mb-2">
        Project By
      </h6>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "22px",            
          flexWrap: "wrap",
          fontWeight: "600"     
        }}
      >
        <span>Ansh Patel</span>
        <span>|</span>
        <span>Suyash Shrivastava</span>
        <span>|</span>
        <span>Radheshyam Ambhore</span>
        <span>|</span>
        <span>Aryan Kesharwani</span>
      </div>
    </footer>
  );
}

export default Footer;
