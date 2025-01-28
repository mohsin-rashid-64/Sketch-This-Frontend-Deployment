import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider, signUpWithEmail } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthContext.js";
import "./Login.scss";
import AuthModalContainer from "./AuthModalContainer.js";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import { useCreate } from "../../hooks/useCreate.js";

function Register({ show, handleClose, openLoginModal }) {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { _auth, _setAuth } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { loading, error, create } = useCreate("auth/sign_up");
  

  const validateForm = () => {
    let formErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,15}$/; // Updated regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format

    if (!first_name) {
      formErrors.first_name = "First Name is required";
    } else if (!nameRegex.test(first_name)) {
      formErrors.first_name = "First Name can only contain letters and spaces";
    }

    if (!last_name) {
      formErrors.last_name = "Last Name is required";
    } else if (!nameRegex.test(last_name)) {
      formErrors.last_name = "Last Name can only contain letters and spaces";
    }

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email =
        "Email must be a valid email address (e.g., user@example.com)";
    }

    if (!address) {
      formErrors.address = "Address is required";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      formErrors.password =
        "Password must be 8-15 characters long, with at least one uppercase, one lowercase, and one special character.";
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Only proceed if form is valid

    try {
      const signUpStatus = await signUpWithEmail(email, password);
      const payload = { first_name, last_name, email, address, password };
      const response = await create(payload);


      if (response.status_code === 201) {
        alert("User registered successfully");
        setfirst_name("");
        setlast_name("");
        setEmail("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        handleClose();
      }
    } catch (error) {
      console.error("Error registering user:", error);

      if (error.code) {
        // Handle Firebase authentication errors
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrors({ firebase: "This email is already in use." });
            break;
          case "auth/invalid-email":
            setErrors({ firebase: "Invalid email address." });
            break;
          case "auth/weak-password":
            setErrors({
              firebase: "Password is too weak. Please use a stronger password.",
            });
            break;
          default:
            setErrors({
              firebase: "An unexpected error occurred. Please try again later.",
            });
        }
      } else if (error.response) {
        // Handle server-side errors
        console.error("Server error details:", error.response.data);
        setErrors({
          firebase:
            error.response.data?.message ||
            "Error registering user. Please try again.",
        });
      } else {
        // Handle network or unexpected errors
        setErrors({
          firebase: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

 

  return (
    <Modal show={show} onHide={handleClose} centered className="login-modal">
      <Modal.Body>
        <div className="login">
          <div className="loginForm">
            <div className="title">
              <h3>Register your Account</h3>
              <p>Please Sign Up to your Account to Continue with us!</p>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="first_name">
                  First Name <span className="asterix">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setfirst_name(e.target.value)}
                />
                {errors.first_name && (
                  <p className="error-text">{errors.first_name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="last_name">
                  Last Name <span className="asterix">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setlast_name(e.target.value)}
                />
                {errors.last_name && (
                  <p className="error-text">{errors.last_name}</p>
                  // {errors.firebase && <p className="error-text">{errors.firebase}</p>}
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="asterix">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Address <span className="asterix">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <p className="error-text">{errors.address}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password <span className="asterix">*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password <span className="asterix">*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div
                    className="eye-icon"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="error-text">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                className="loginBtn"
                type="button"
                onClick={handleRegister}
                disabled={loading} // Disable button during loading
              >
                {loading ? "Signing Up..." : "Sign Up"}{" "}
                
              </button>

              {errors.firebase && (
                <p className="error-text">{errors.firebase}</p>
              )}

              <div className="register">
                <p>
                  Already have an account?{" "}
                  <span
                    className="login-link-x"
                    onClick={() => {
                      openLoginModal(true);
                      handleClose(true);
                    }}
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
