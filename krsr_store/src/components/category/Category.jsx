import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

function Category({ image, text, link }) {
    return (
        <div>
            <Link to={link}>
            <div className="category" style={{ backgroundImage: `url(${image})` }}>
                <div className="label">
                    <p id="title">{text}</p>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default Category;