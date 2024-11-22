import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import { Link } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider, signInWithEmail } from '../../firebase/config';
import { AuthContext } from "../../Context/AuthContext.js";

function Login({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { _auth, _setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login process starts
    try {
      const signInStatus = await signInWithEmail(email, password);
      const idToken = await signInStatus.getIdToken();

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        _setAuth(true);
        handleClose();
        if (!response.data.profile_completed) {
          navigate('/seeBoard');
        } else {
          navigate('/seeBoard');
        }
        localStorage.setItem('jwt', response.data.token);
      } else {
        _setAuth(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setServerError('Error logging in');
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const handleClick = (provider) => {
    setLoading(true); // Set loading to true for OAuth login
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const idToken = await data.user.stsTokenManager.accessToken;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/login`,
          { idToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          _setAuth(true);
          handleClose();
          if (!response.data.profile_completed) {
            navigate('/seeBoard');
          } else {
            navigate('/seeBoard');
          }
          localStorage.setItem("jwt", response.data.token);
        } else {
          _setAuth(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after OAuth login completes
      });
  };

  useEffect(() => {
    console.log("YO LOGIN");
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered className="login-modal">
      <Modal.Body>
        <div className="login">
          <div className="loginForm">
            <div className="title">
              <h3>Hello! Welcome back</h3>
              <p>Login with your data that you entered during your registration</p>
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
                  disabled={loading} // Disable input while loading
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  disabled={loading} // Disable input while loading
                />
              </div>
              {serverError && <span className="error" style={{ color: 'red' }}>{serverError}</span>}
              <br />
              <button className="loginBtn" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'} {/* Change button text based on loading state */}
              </button>
              <div className="or">
                <p>
                  <span>Or</span>
                </p>
              </div>
              <div className="buttons">
                <button onClick={() => handleClick(GoogleProvider)} disabled={loading}>
                  <img src="/images/wg.svg" alt="google" />
                  Google
                </button>
                {/* <button onClick={() => handleClick(GoogleProvider)} disabled={loading}>
                  <img src="/images/wf.svg" alt="google" />
                  Google
                </button>
                <button onClick={() => handleClick(GoogleProvider)} disabled={loading}>
                  <img src="/images/wa.svg" alt="google" />
                  Google */}
                {/* </button> */}
              </div>
              <div className="register">
              <p>
                Don't have an account? <Link to="/">Register</Link>
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
