import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>Jewelry Store</h2>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Jewelry Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
