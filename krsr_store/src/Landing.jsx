import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

function LandingPage() {
  const [name, setName] = useState("guest");
  const [key, setKey] = useState("no-key");

  useEffect(() => {
    setName(localStorage.getItem("user") ? localStorage.getItem("user") : "guest");
    setKey(localStorage.getItem("key") ? localStorage.getItem("key"): "no-key");
  });
  return <>
  <Navigate to={`/home?username=${name}&key=${key}`}></Navigate>
  </>;
}

export default LandingPage;