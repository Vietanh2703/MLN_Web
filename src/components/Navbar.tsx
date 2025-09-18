import './Navbar.css';
import * as React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Logo bên trái */}
                    <div className="navbar-logo">
                        <div className="logo-text">
                            LOGO
                        </div>
                    </div>

                    {/* Nút trắc nghiệm bên phải */}
                    <div className="navbar-menu">
                        <button className="quiz-button">
                            Trắc nghiệm
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
