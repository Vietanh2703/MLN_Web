import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar" style={{ background: '#ffffff' }}>
            <div className="navbar-container">
                {/* Logo/Brand */}
                <Link to="/" className="navbar-brand-link">
                    <div className="navbar-brand">
                        <div className="brand-text">
                            <span
                                className="brand-title"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontWeight: 900,
                                    color: '#dc2626',
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                PHÒNG CHỐNG THAM NHŨNG
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Quiz Button */}
                <div className="navbar-cta">
                    <Link to="/quiz" className="quiz-button-link">
                        <button
                            className="quiz-button"
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                fontWeight: 700
                            }}
                        >
                            Trắc nghiệm
                        </button>
                    </Link>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Nunito:wght@300;400;500;600;700;800&family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
                
                .navbar {
                    box-shadow: 0 2px 10px rgba(220, 38, 38, 0.1);
                    border-bottom: 1px solid rgba(220, 38, 38, 0.1);
                }
                
                .brand-title {
                    text-shadow: 1px 1px 2px rgba(220, 38, 38, 0.1);
                }
                
                .quiz-button {
                    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 25px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
                }
                
                .quiz-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
                    background: linear-gradient(135deg, #991b1b 0%, #dc2626 100%);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;