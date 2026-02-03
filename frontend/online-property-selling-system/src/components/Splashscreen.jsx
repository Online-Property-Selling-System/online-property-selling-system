import React, { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ finishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 2500);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="splash-wrapper">
      <div className="splash-inner">
        <div className="logo-container">
          <h1 className="display-4 fw-bold text-white mb-0">
            Property<span className="text-primary">Hub</span>
          </h1>
          <p className="text-secondary small tracking-widest mt-2">
            MODERN LIVING AWAITS
          </p>
        </div>
        <div className="aesthetic-loader mt-4">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;