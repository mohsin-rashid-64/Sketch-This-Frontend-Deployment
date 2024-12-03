import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider, signUpWithEmail } from '../../firebase/config';
import { AuthContext } from "../../Context/AuthContext.js";
import './Login.scss';
import AuthModalContainer from './AuthModalContainer.js';

function Register({ show, handleClose, openLoginModal }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { _auth, _setAuth } = useContext(AuthContext);

  const validateForm = () => {
    let formErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,15}$/;

    if (!fullName) formErrors.fullName = 'Full Name is required';
    if (!email) formErrors.email = 'Email is required';
    if (!phone) formErrors.phone = 'Phone is required';
    if (!address) formErrors.address = 'Address is required';
    if (!password) formErrors.password = 'Password is required';
    if (!passwordRegex.test(password)) formErrors.password = 'Password must be 8-15 characters, with at least one uppercase and one special character';
    if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    if (!confirmPassword) formErrors.confirmPassword = 'Please confirm your password';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Only proceed if form is valid

    try {
      console.log(`HANDLE REGISTER YO RESPONES XXXXXX ${process.env.REACT_APP_API_URL}`);

      const signUpStatus = await signUpWithEmail(email, password);
      console.log('signUpStatus', signUpStatus);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sign_up`, {
          email: email
        }
      );

      console.log('YAR THAT RESPONSE');

      alert('Sign-Up successful!', signUpStatus);
      alert('User registered successfully');
      handleClose();
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        console.error('Server error details:', error.response.data);
      } else {
        alert('Error registering user. Please check the form and try again.');
      }
    }
  };

  const handleClick = (provider) => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        console.log('GOOGLE DATA TOKEN  ', data);
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
          console.log('RESPONSE CLICK', response.data.profile_completed);
          handleClose();
          if (!response.data.profile_completed) {
            navigate('/edit-profile');
          } else {
            navigate('/');
          }
        } else {
          _setAuth(false);
        }

        localStorage.setItem("jwt", response.data.token);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
                <label htmlFor="name">Full Name <span className='asterix'>*</span></label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <img src="/images/user.svg" alt="img" />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email <span className='asterix'>*</span></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img src="/images/f1.svg" alt="img" />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone <span className='asterix'>*</span></label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <img src="/images/phone.svg" alt="img" />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address <span className='asterix'>*</span></label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <img src="/images/address.svg" alt="img" />
                {errors.address && <p className="error-text">{errors.address}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password <span className='asterix'>*</span></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img src="/images/f2.svg" alt="img" />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password <span className='asterix'>*</span></label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
              <button className="loginBtn" type="button" onClick={handleRegister}>
                Sign Up
              </button>
              <div className="register">
                <p>
                  Already have an account? <span className='login-link-x' onClick={()=>{
                    openLoginModal(true)
                    handleClose(true)
                  }}>Login</span>
                </p>
              </div>
              <div className="or">
                <p>
                  <span>Or</span>
                </p>
              </div>
            </form>
            <div className="buttons">
              <button onClick={() => handleClick(GoogleProvider)}>
                <img src="/images/wg.svg" alt="google" />
                Google
              </button>
              <button onClick={() => handleClick()}>
                <img src="/images/wf.svg" alt="facebook" />
                Facebook
              </button>
              <button>
                <img src="/images/wa.svg" alt="apple" />
                Apple
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
