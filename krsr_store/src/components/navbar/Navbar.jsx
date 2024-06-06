import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import cart from "../../assets/cart.svg";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [username, setUsername] = useState(params.get('username') || localStorage.getItem("user") || "guest");
    const [key, setKey] = useState(params.get('key') || localStorage.getItem("key") || "no-key");

    useEffect(() => {
        const storedUsername = localStorage.getItem("user");
        const storedKey = localStorage.getItem("key");

        if (username === "guest" || username !== storedUsername) {
            setUsername(storedUsername || "guest");
        }
        if (key === "no-key" || key !== storedKey) {
            setKey(storedKey || "no-key");
        }
    }, [username, key]);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("key");
        localStorage.removeItem("token");
        navigate("/auth_login");
    }

    return (
        <div>
            <nav>
                <Link to={`/home?username=${username}&key=${key}`}>
                    <div className="logo-navbar">
                        <img src={cart} alt="logo" />
                    </div>
                </Link>
                <div className="name">
                    <Link to={`/home?username=${username}&key=${key}`}>
                        <p>Trinity Online Electronics Store</p>
                    </Link>
                </div>
                <ul>
                    <li><Link to={`/home?username=${username}&key=${key}`}>Home</Link></li>
                    <li><Link to={`/about?username=${username}&key=${key}`}>About</Link></li>
                    <li onClick={logout}><i className="bi bi-door-closed"></i></li>
                    <li><Link to={`/profile?username=${username}&key=${key}`}><i className="bi bi-person-circle"></i></Link></li>
                    <li><Link to={`/cart?username=${username}&key=${key}`}><i className="bi bi-cart"></i></Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
