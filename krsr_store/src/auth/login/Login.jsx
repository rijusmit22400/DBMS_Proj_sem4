import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handle_login = (event) => {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          const token = response.headers.get("Authorization");
          response.json().then((data) => {
            const store_username = data.username;
            const store_pass = data.key;
            localStorage.setItem("user", store_username);
            localStorage.setItem("key", store_pass);
            localStorage.setItem("token", token);
            // Ensure values are set in localStorage before retrieving them
            const store_user = localStorage.getItem("user");
            const store_key = localStorage.getItem("key");
            console.log("Logged in");
            navigate(`/home?name=${store_user}&key=${store_key}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handle_register = () => {
    navigate("/auth_register");
  };

  return (
    <div>
      <div id="auth">
        <div id="skip-container">
          <Link to={"/"}>
            skip<span className="material-symbols-outlined">chevron_right</span>
          </Link>
        </div>
        <p id="store-name">Trinity</p>
        <p id="login">Login</p>
        <form onSubmit={handle_login}>
          <fieldset>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </fieldset>
          <button type="button" id="handle_login" onClick={handle_login}>
            Log in
          </button>
        </form>
        <p>Not Registered?</p>
        <button type="button" id="handle_register" onClick={handle_register}>
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Login;
