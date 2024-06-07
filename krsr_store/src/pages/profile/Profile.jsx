import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Profile.css";

function Profile() {

    const [new_details, setDetails] = useState({ new_full_name: "", new_username: "", new_email:"" ,new_password: "", new_contact: "", new_address: "" });

    const navigate = useNavigate();
    const location = useLocation();
    const details = new URLSearchParams(location.search);
    let username = details.get('username');
    let key = details.get('key');
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    useEffect(() => {
        if (token === null) {
            navigate("/auth_login");
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ username: username, key: key })
            };
            fetch('http://localhost:5000/validate_token', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.entry === "valid") {
                        console.log("Token is valid");
                    } else {
                        navigate("/auth_login");
                    }
                })
                .catch(error => {
                    console.log(error);
                    navigate("/auth_login");
                });
        }
    }, [token, navigate, username, key]);

    const send_details = (e) => {
        e.preventDefault(); // Prevent default form submission

        const requestOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ username: username, key: key, ...new_details })
        };

        fetch('http://localhost:5000/change_details', requestOptions)
            .then(response => {
                if(response.ok) {
                    console.log("Details updated successfully");
                    console.log(response.headers);
                    response.json().then(data => {
                        const res_token = response.headers.get("Authorization");
                        const store_username = data.username;
                        const store_key = data.key;
                        localStorage.setItem("user", store_username);
                        localStorage.setItem("key", store_key);
                        localStorage.setItem("token", res_token);
                        navigate(`/home?username=${store_username}&key=${store_key}`);
                    });
                }
            })
            .catch(error => console.log(error));
    }

    const clean_object = (e) => {
        e.preventDefault(); // Prevent default form submission
        setDetails({ new_full_name: "", new_username: "", new_password: "", new_email: "", new_contact: "", new_address: "" });
        navigate("/");
    }

    return (
        <div>
            <Navbar />
            <div className="categories-heading">
                <p>Update your profile</p>
            </div>
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="full_name">Full Name</label>
                                <input 
                                    type="text" 
                                    name="full_name" 
                                    id="full_name" 
                                    placeholder="Enter your full name" 
                                    value={new_details.new_full_name} 
                                    onChange={(e) => setDetails({ ...new_details, new_full_name: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    placeholder="Enter your username" 
                                    value={new_details.new_username} 
                                    onChange={(e) => setDetails({ ...new_details, new_username: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    value={new_details.new_password} 
                                    onChange={(e) => setDetails({ ...new_details, new_password: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Enter your contact email" 
                                    value={new_details.new_email} 
                                    onChange={(e) => setDetails({ ...new_details, new_email: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">Contact</label>
                                <input 
                                    type="text" 
                                    name="contact" 
                                    id="contact" 
                                    placeholder="Enter your contact number" 
                                    value={new_details.new_contact} 
                                    onChange={(e) => setDetails({ ...new_details, new_contact: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    id="address" 
                                    placeholder="Enter your address" 
                                    value={new_details.new_address} 
                                    onChange={(e) => setDetails({ ...new_details, new_address: e.target.value })} 
                                />
                            </div>
                            <div className="button-group">
                                <button type="button" className="btn discard-button" onClick={clean_object}>Discard Changes <i className="bi bi-x"></i></button>
                                <button type="button" className="btn save-button" onClick={send_details}>Save Changes <i className="bi bi-check2-all"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
