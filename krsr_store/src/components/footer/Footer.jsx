import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div>
            <footer>
                <div className="footer-body">
                <div className="footer-content">
                    <p id="footer-heading">Trinity Store</p>
                    <p id="footer-description">Welcome to the Trinity Electronics Store, crafted by a dedicated group of four passionate individuals. Our platform is designed to provide a seamless and efficient online shopping experience for all your electronic needs. Initially not hosted, we are now proud to offer a fully hosted solution that ensures real-time updates, personalized dashboards, and secure transactions.
                    With our user-friendly interface, you can browse a wide range of products, check specifications, and make purchases with just a few clicks. Our team is committed to bringing you the latest and greatest in electronics. Thank you for choosing Trinity. For any assistance, please contact our support team. Happy shopping!
                    </p>
                </div>
                <div className="gap-between-content-and-bottom">
                </div>
                <div className="footer-bottom">
                    <p>&copy; KRSR Store | Designed by Rijusmit Biswas contibutions to Ideas and Concept and prototypes by  Ketan Garg, Saksham Saini, Rohan Beriwal</p>
                </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;