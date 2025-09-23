import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo/Brand */}
                <Link to="/" className="navbar-brand-link">
                    <div className="navbar-brand">
                        <div className="brand-text">
                            <span className="brand-title">PHÒNG CHỐNG THAM NHŨNG</span>
                        </div>
                    </div>
                </Link>

                {/* Quiz Button */}
                <div className="navbar-cta">
                    <Link to="/quiz" className="quiz-button-link">
                        <button className="quiz-button">
                            Trắc nghiệm
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;