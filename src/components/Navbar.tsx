import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo/Brand */}
                <div className="navbar-brand">
                    <div className="brand-icon">
                        <div className="shield-icon">🛡️</div>
                    </div>
                    <div className="brand-text">
                        <span className="brand-title">PHÒNG CHỐNG THAM NHŨNG</span>
                        <span className="brand-subtitle">Vì một Việt Nam trong sạch</span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="navbar-menu">
                    <a href="#home" className="nav-link active">Trang chủ</a>
                    <a href="#about" className="nav-link">Tham nhũng là gì</a>
                    <a href="#protection" className="nav-link">Bảo vệ chế độ</a>
                    <a href="#responsibility" className="nav-link">Trách nhiệm công dân</a>
                    <a href="#resources" className="nav-link">Tài nguyên</a>
                </div>

                {/* CTA Button */}
                <div className="navbar-cta">
                    <button className="report-button">
                        <span className="report-icon">📢</span>
                        Báo cáo tham nhũng
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;