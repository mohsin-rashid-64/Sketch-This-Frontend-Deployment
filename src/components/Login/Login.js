import {useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider, signInWithEmail } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthContext.js";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useCreate } from "../../hooks/useCreate.js";


function Login({ show, handleClose, openRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { _auth, _setAuth } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loading, error, create } = useCreate("auth/login");
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    // Clear errors when the user modifies inputs
    setServerError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors({}); // Clear previous errors
    setServerError(""); // Clear server error

    // Validate inputs
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Set form errors if any
      return;
    }

   

    try {
      // Attempt to sign in with email and password
      const signInStatus = await signInWithEmail(email, password);
      const idToken = await signInStatus.getIdToken();
      const payload = { idToken };
      const response = await create(payload);

      if (response.status_code === 201) {
        _setAuth(true);
        handleClose();
        navigate("/seeBoard");
        localStorage.setItem("jwt", response.token);
      } else {
        setServerError("Email or password is incorrect.");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      // Map Firebase error codes to user-friendly messages
      const firebaseErrorMap = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-email": "The email address is not valid.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/invalid-credential": "Invalid credentials. Please try again.",
        "auth/invalid-password": "Invalid password. Please try again.",
      };

      const errorMessage =
        firebaseErrorMap[error.code] ||
        "An unexpected error occurred. Please try again.";

      setServerError(errorMessage); // Display user-friendly error
    } finally {
      // setLoading(false); 
    }
  };

  const handleClick = (provider) => {
    // setLoading(true); 
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const idToken = await data.user.stsTokenManager.accessToken;


      const payload = { idToken };
      const response = await create(payload);


      if (response.status_code === 201) {
        _setAuth(true);
        handleClose();
        navigate("/seeBoard");
        localStorage.setItem("jwt", response.token);
      }  else {
          _setAuth(false);
        }
      })
      .catch((error) => {
      })
      .finally(() => {
        // setLoading(false); 
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="login-modal">
      <Modal.Body>
        <div className="login">
          <div className="loginForm">
            <div className="title">
              <h3>Hello! Welcome back</h3>
              <p>
                Login with your data that you entered during your registration
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {formErrors.email && (
                  <span className="error-text">{formErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                  <div className="eye-icon" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {formErrors.password && (
                  <span className="error-text">{formErrors.password}</span>
                )}
              </div>

              {serverError && <p className="error-text"> {serverError}</p>}

              <br />
              <button className="loginBtn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}{" "}
                {/* Change button text based on loading state */}
              </button>
              <div className="or">
                <p>
                  <span>Or</span>
                </p>
              </div>
              <div className="buttons">
                <button
                  onClick={() => handleClick(GoogleProvider)}
                  disabled={loading}
                >
                  <img src="/images/wg.svg" alt="google" />
                  Google
                </button>
                <button
                  onClick={() => handleClick(GoogleProvider)}
                  disabled={loading}
                >
                  <img src="/images/wf.svg" alt="google" />
                  Facebook
                </button>
                <button
                  onClick={() => handleClick(GoogleProvider)}
                  disabled={loading}
                >
                  <img src="/images/wa.svg" alt="google" />
                  Apple
                </button>
              </div>
              <div className="register">
                <p>
                  Don't have an account?{" "}
                  <span
                    className="login-link-x"
                    onClick={() => {
                      handleClose(true);
                      openRegisterModal(true);
                    }}
                  >
                    Register
                  </span>
                </p>
              </div>
            </form>
            <br />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
