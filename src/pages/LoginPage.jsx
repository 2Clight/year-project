import React from "react";

function LoginPage() {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Login logic here
    alert("Logged in successfully!");
  };

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
      <div className="alternative-login">
        <p>Or log in with:</p>
        <button className="google-login-btn">
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
