import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./About.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function About() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let username = params.get('name');
    let key = params.get('key');
    let stored_username = localStorage.getItem("user");
    let stored_key = localStorage.getItem("key");
    useEffect(() => {
      if(username === null || username !== stored_username){
        username = "guest";
    }
    
    if(key === null || key !== stored_key){
      key = "no-key";

    }
    if (localStorage.getItem("token") === null) {
        navigate("/about?username=guest&key=no-key");
    }
    }, []);
    console.log(username);
    console.log(key);
    return (
        <div>
        <Navbar></Navbar>
        <div className ="categories-heading">
        <p>About Project and The Author</p>
        <div className="content-about">
            <p>Hello, my name is Rijusmit Biswas, I am a second year student at IIIT-Delhi, I am 20 years old right now</p>
            <div className="gap"></div>
            <p>This is my DBMS project, of course when it was first made it didn't look like this and it even had a smaller tech stack. This project was initially made by a team of 4 under guidelines of DR. Vikram Goyal. The aim of this project was to display all database concepts taught throught the course. The project was divided into 6 submissions each dealt with forming the database for our final product which was according to guidelines known to be an online store.</p>
            <p>Later I scaled this project by adding more usecases and proper authentication.</p>
            <p>The tech stack roughly used here is. React.JS using Vite, CSS, Mysql database, cloud hosting done using AZURE mysql database and Vercel for front-end hosting, Authentication is done using JWT tokens, Backend is being handled using Python and Flask framework, SqlAlcehmy is used as an ORM to access the database, instead of mysql-connecter. Initiall KRSR website designs were made by Rohan Beriwal, Saksham Saini and Ketan Garg. Intial front-end was developed by Ketan Garg.</p>
            <div className="gap"></div>
            <br/>
            <p>This is a new Website model, remade by me from the scratch. This project was made for leanring purposes, it was made in order to learn concepts like deployment, design, planning and execution of a product. Also making an authentication server from scratch.</p>
            <div className="gap"></div>
            <p>Trinity - Online Electronics Store. Home for all electronics solutions.</p>
            <div className="gap"></div>
            <div className="gap"></div>
        </div>
        </div>
        <Footer></Footer>
        </div>
    );
}

export default About;