import React from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    // Mock Google signup logic here
    alert("Continuing with Google...");
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Signup logic here
    alert("Account created successfully!");
  };

  return (
    <div className="signup-page">
      <h1>Create an Account</h1>
      <form onSubmit={handleSignupSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="alternative-signup">
        <p>Or sign up with:</p>
        <button className="google-signup-btn" onClick={handleGoogleSignup}>
          Continue with Google
        </button>
      </div>
      <div className="login-redirect">
        <p>Already have an account?</p>
        <button className="login-btn" onClick={handleLoginRedirect}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default SignupPage;