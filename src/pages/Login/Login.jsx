import React, { useState } from "react";
import "./login.css";
import { TbBrandNetflix } from "react-icons/tb";
import { login, signup } from "../../Firebase";

const Login = () => {
  const [signstate, setSignstate] = useState("Sign In"); //one is display other wil not be displayed like if signup display sign in will not be displayed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    if (signstate === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  return (
    <div className="login">
      <TbBrandNetflix />
      <div className="login-form">
        <h1 className="">{signstate}</h1>
        <form>
          {signstate === "Sign Up" ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name "
              style={{color: "black"}}
            />
          ) : (
            <></>
          )}
          {/* agar sigup hei tabhi name dikhega warna name will be hidden */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email "
            style={{color: "black"}}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password "
            style={{color: "black"}}
          />
          <button type="submit" onClick={user_auth}>{signstate}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <p>NEED HELP?</p>
          </div>
        </form>
        <div className="form-switch">
          {signstate === "Sign In" ? (
            <p>
              New To Netflix?{" "}
              <span
                onClick={() => {
                  setSignstate("Sign Up");
                }}
              >
                SIGN UP NOW{" "}
              </span>
            </p>
          ) : (
            <p>
              Already Have An Account?{" "}
              <span
                onClick={() => {
                  setSignstate("Sign In");
                }}
              >
                SIGN IN NOW
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
