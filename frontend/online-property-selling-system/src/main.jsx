import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SplashScreen from "./components/SplashScreen";

// 1. Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"; 

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <React.StrictMode>
      {isLoading ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <div className="page-reveal">
          <App />
          {/* 2. Add ToastContainer here */}
         <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true} // Newest on top looks better for forms
  closeOnClick
  pauseOnHover
  theme="dark" // Keeps the base dark
  toastStyle={{ 
    backgroundColor: "#0f172a", // Match your card background
    color: "#fff",
    border: "1px solid rgba(129, 140, 248, 0.2)", // Subtle Indigo border
    borderRadius: "16px",
    backdropFilter: "blur(10px)" 
  }}
/>

        </div>
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RootComponent />);