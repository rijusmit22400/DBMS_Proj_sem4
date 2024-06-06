import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Cart.css";
import "../../assets/cart.svg"


function Cart() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    const navigate = useNavigate();
    const location = useLocation();
    const details = new URLSearchParams(location.search);
    let username = details.get('username');

    const get_items = () => {
        fetch('http://localhost:5000/show_cart/' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setItems(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const get_details = () => {
        fetch('http://localhost:5000/show_details/' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        if (token === null) {
            navigate("/auth_login");
        } else {
            get_items();
            get_details();
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({username: username, key: details.get('key')})
            }
            fetch('http://localhost:5000/validate_token', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.entry === "valid") {
                    console.log("Token is valid")
                } else {
                    navigate("/auth_login");
                }
            })
            .catch(error => {
                console.log(error);
                navigate("/auth_login");
            });
        }
    }, [token, username, navigate]);

    useEffect(() => {
        const total = calculate_total();
        setTotal(total);
    }, [items]);

    const calculate_total = () => {
        let total = 0;
        for (let x of items) {
            total += x.price * x.quantity;
        }
        return total;
    }

    const handle_checkout = () => {
        if(total === 0) {
            alert("Cart is empty");
            navigate("/home?username=" + username + "&key=" + details.get('key'));
            return;
        }
        console.log("Checkout initiated");
        const payload = {
            username: username,
            key: details.get('key')
        }
        fetch('http://localhost:5000/checkout', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.entry === "success") {
                console.log("Checkout successful");
                navigate("/delivery");
            } else {
                console.log("Checkout failed");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="categories-heading">
                <p>View your cart</p>
            </div>
            <div id="cart-container">
                {items.length === 0 ? <div id="empty-cart">Cart is empty</div> :<div id="items" className="box-in-cart-page">
                    {items.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <div className="item-image">
                                    <img src={"https://cdn11.bigcommerce.com/s-jjm7kgkrrc/images/stencil/1280x1280/products/82569/6197802/product_placeholder__65638.1673413880.jpg?c=1"} alt="item" />
                                </div>
                                <div className="item-details">
                                    <p id="product-name">{item.name}</p>
                                    <p id="product-price">Price: &#8377;{item.price.toFixed(2)}</p>
                                    <p id="product-quantity">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>}
                <div id="summary" className="box-in-cart-page">
                    <p id="total">Total: &#8377;{total.toFixed(2)}</p>
                    <div id="customer-details">
                        <p><span id="detail">Name:</span> {data.full_name}</p>
                        <p><span id="detail">Contact Number:</span> {data.contact}</p>
                        <p><span id="detail">Email:</span> {data.email}</p>
                        <p><span id="detail">Shipping to:</span> {data.address}</p>
                    </div>
                    <div>
                        <label htmlFor="payment">Payment:</label>
                        <select id="payment" name="payment">
                            <option>Payment Method</option>
                            <option>Cach on Delivery</option>
                            <option>UPI</option>
                            <option>Razorpay</option>
                            <option>Credit/Debit Card</option>
                        </select>
                    </div>
                    <div>
                        <button type="button" onClick={handle_checkout} id="checkout">Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
