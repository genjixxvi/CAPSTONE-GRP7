import { useState, useEffect } from "react";
import Login from "../components/AuthForm/Login";
import Register from "../components/AuthForm/Register";
import "../index.css";
import bookLover from "../assets/bookLover.svg";
import educ from "../assets/educ.svg";
import { motion } from "framer-motion";
import { SlideDown } from "../utility/animation.jsx";

const Auth = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let timer;
    if (isSignUpMode) {
      timer = setTimeout(() => setShowForm(true), 1000);
    } else {
      timer = setTimeout(() => setShowForm(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isSignUpMode]);

  const toggleAuthMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };

  return (
    <motion.div
      variants={SlideDown(0.1)}
      initial="hidden"
      animate="visible"
      className={`custom-container ${isSignUpMode ? "custom-sign-up-mode" : ""}`}
    >
      <div className="custom-forms-container">
        <div className="custom-signin-signup">
          {showForm ? <Register /> : <Login />}
        </div>
      </div>

      <div className="custom-panels-container">
        <div className="custom-panel custom-left-panel">
          <div className="custom-content">
            <h3>New here ?</h3>
            <p>Sign up and discover new learning! explore and enchance your knowledge</p>
            <button className="custom-btn transparent" onClick={toggleAuthMode}>
              Sign up
            </button>
          </div>
          <img src={bookLover} className="custom-image" alt="" />
        </div>
        <div className="custom-panel custom-right-panel">
          <div className="custom-content">
            <h3>One of us ?</h3>
            <p>To keep connected with us please log in with your personal account</p>
            <button className="custom-btn transparent" onClick={toggleAuthMode}>
              Log in
            </button>
          </div>
          <img src={educ} className="custom-image" alt="" />
        </div>
      </div>
    </motion.div>
  );
};

export default Auth;
