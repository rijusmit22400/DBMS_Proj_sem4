import React from "react";
import "./Card.css";
import { useState } from "react";

function Card({id, name, description, price, stock}) {
    const [quantity,setQuantity] = useState(1);
    const params = new URLSearchParams(location.search);
    const user = params.get("username");

    const add_to_cart = (event) => {
        const payload ={
            user: user,
            p_id: id,
            quantity: quantity
        }

        fetch("/call/cart",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
        }).then((Response)=>{
            console.log("Added to Cart" + Response);
        }).catch((ERROR)=>{
            console.log("Could not Add to cart" + ERROR);
        });


    }
    return (
        <>
        <div className="container-products">
            <div>
            <img className="im_card" src="https://images.pond5.com/robot-user-profile-icon-avatar-illustration-169920823_iconl.jpeg"/>
            </div>
            <div>
            <p id="name">{name}</p>
            <p id="description">{description}</p>
            <p id="price">&#8377; {price}</p>
            <div id="data-field"><button id="add-to-cart" onClick={add_to_cart}>Add to Cart</button>
            <div id="data-field-quantity">
            <button className="items-counter" type="button">+</button>
            <input value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} name="quantity" id="quantity" max={stock} min="1" type="number"/>
            <button className="items-counter" type="button">-</button>
            </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Card;