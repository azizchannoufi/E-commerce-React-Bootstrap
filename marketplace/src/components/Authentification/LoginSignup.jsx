import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginSignup.css';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); // Initially set to true for Login view

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between Login and Signup views
  };

  return (
    <div className="login-signup-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <div className={`form-container ${isLogin ? 'show-login' : 'show-signup'}`}>
          <div className="login-form">
            <h2 className="text-center mb-4">Login</h2>
            <form>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group mt-3">
                <input type="password" className="form-control" placeholder="Password" required />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
            </form>
            <p className="text-center mt-3">
              Don’t have an account?{' '}
              <span onClick={toggleForm} className="toggle-link text-primary" style={{ cursor: 'pointer' }}>
                Sign up here
              </span>
            </p>
          </div>
          
          <div className="signup-form">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Full Name" required />
              </div>
              <div className="form-group mt-3">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group mt-3">
                <input type="password" className="form-control" placeholder="Password" required />
              </div>
              <button type="submit" className="btn btn-success w-100 mt-4">Sign Up</button>
            </form>
            <p className="text-center mt-3">
              Already have an account?{' '}
              <span onClick={toggleForm} className="toggle-link text-success" style={{ cursor: 'pointer' }}>
                Log in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
