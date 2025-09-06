import React, { useState, useEffect } from "react";
import "./login.css";
import { TbBrandNetflix } from "react-icons/tb";
import { FaGoogle } from "react-icons/fa";
import { login, signup, signInWithGoogle, auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signstate, setSignstate] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signstate === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-background">
        <img src="/loin-bg.jpg" alt="Background" />
        <div className="login-overlay"></div>
      </div>
      <div className="login-header">
        <TbBrandNetflix className="login-logo" />
      </div>
      <div className="login-form">
        <h1>{signstate}</h1>
        <form onSubmit={user_auth}>
          {signstate === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : signstate}
          </button>
        </form>
        
        <div className="form-divider">
          <span>OR</span>
        </div>
        
        <button 
          className="google-signin-btn" 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FaGoogle className="google-icon" />
          Sign in with Google
        </button>
        
        <div className="form-help">
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p>Need help?</p>
        </div>
        
        <div className="form-switch">
          {signstate === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => setSignstate("Sign Up")}
              >
                Sign up now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setSignstate("Sign In")}
              >
                Sign in now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
