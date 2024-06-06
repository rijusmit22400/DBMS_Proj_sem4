import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Delivery.css";
import { useLocation, useNavigate } from "react-router-dom";


function Delivery() {
    let navigation = useNavigate();
    const [seconds, setSeconds] = React.useState(10);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let username = params.get('name');
    let key = params.get('key');
    if(username === null || username !== localStorage.getItem("user")){
        username = "guest";
    }
    
    if(key === null || key !== localStorage.getItem("password")){
        key = "no-key";
    }
    useEffect(() => {
        if(seconds >= 0){
            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            navigation("/");
        }
    }, [seconds, navigation]);
    return (
        <div>
        <Navbar></Navbar>
        <div className="container">
        <div className ="categories-heading">
        <p>Your Order is Dispatched.</p>
        </div>
        <div>Keep shopping and stick out for more offers....</div>
        <div id="to-root">You'll be automatically redirected to the home page.. in <span>{seconds}</span> {"second(s)"}</div>
        </div>
        <Footer></Footer>
        </div>
    );
}

export default Delivery;