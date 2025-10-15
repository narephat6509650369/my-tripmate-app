
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
    // เรียก API backend เพื่อตรวจสอบ login
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
          Sign In
        </button>
      </form>

      <div style={{ margin: "20px 0" }}>or</div>

      <button onClick={handleGoogleLogin} style={{ padding: "10px 20px" }}>
        Sign in with Google
      </button>

      <p style={{ marginTop: "20px" }}>
        Don’t you have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
