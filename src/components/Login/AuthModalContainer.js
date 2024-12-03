import React, { useState } from 'react';
import Register from './Register';  // Import Register modal
import Login from './Login';        // Import Login modal

function AuthModalContainer() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Functions to open and close the modals
  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);
  const openLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);


  

  return (
    <div>
      {/* Button to open Register Modal */}
      {/* <button onClick={openRegisterModal}>Register</button>
      <button onClick={openLoginModal}>Login</button> */}

    <div style={{display:'flex', gap:"70px"}}>
        <button className="nav-link" onClick={() => { setShowLogin(true) }}>Login</button>
        <button onClick={() => { setShowRegister(true) }} className="nav-link">Register</button> 

    </div>

      {/* Register Modal */}
      <Register
        show={showRegister}
        handleClose={closeRegisterModal}
        openLoginModal={openLoginModal} // Pass the function to open login modal
      />

      {/* Login Modal */}
      <Login
        show={showLogin}
        handleClose={closeLoginModal}
        openRegisterModal={openRegisterModal}
      />
    </div>
  );
}

export default AuthModalContainer;
