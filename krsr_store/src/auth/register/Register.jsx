import React from "react";
import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [full_name, setFull_name] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  let navigation = useNavigate();

  const handle_registration = (event) => {
    event.preventDefault();
    alert("Registering");
    const payload = {
      full_name: full_name,
      username: username,
      password: password,
      contact: contact,
      address: address,
      email: email
    };
    fetch("/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(Response => {
      if (Response.ok) {
        window.location.href = "/auth_login";
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  const handleLoginClick = () => {
    navigation("/auth_login");
  };

  return (
    <div>
      <div id="auth-register">
        <div id="heading">
          <div id="skip-container">
            <Link to={"/"}>skip<span className="material-symbols-outlined">chevron_right</span></Link>
          </div>
          <p id="store-name">Trinity</p>
        </div>
        <p id="login">Register</p>
        <form onSubmit={handle_registration}>
          <fieldset>
            <div className="input-pair">
              <label htmlFor="full_name">Full Name:<input type="text" name="full_name" value={full_name} onChange={(e) => { setFull_name(e.target.value) }} required /></label>
              <label htmlFor="username">Username:<input type="text" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} required /></label>
            </div>
            <div className="input-pair">
              <label htmlFor="password">Password:<input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required /></label>
              <label htmlFor="contact">Contact:<input type="text" name="contact" value={contact} onChange={(e) => { setContact(e.target.value) }} required /></label>
            </div>
            <div className="input-pair">
              <label htmlFor="address">Address:<input type="text" name="address" value={address} onChange={(e) => { setAddress(e.target.value) }} required /></label>
              <label htmlFor="email">Email:<input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required /></label>
            </div>
          </fieldset>
          <button type="submit">Register</button>
        </form>
        <p>Already Registered?</p>
        <button type="button" id="handle-login" onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
}

export default Register;
