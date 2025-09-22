import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-container">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span>🇻🇳</span>
                            <span>Cộng hòa Xã hội chủ nghĩa Việt Nam</span>
                        </div>
                        <h1 className="hero-title">
                            PHÒNG CHỐNG THAM NHŨNG
                            <span className="title-highlight">VÌ MỘT VIỆT NAM TRONG SẠCH</span>
                        </h1>
                        <p className="hero-subtitle">
                            "Chống tham nhũng là cuộc đấu tranh lâu dài, phức tạp, đòi hỏi sự quyết tâm cao của toàn Đảng, toàn dân"
                        </p>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Cam kết trong sạch</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">0</div>
                                <div className="stat-label">Vùng cấm</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Tiếp nhận tố cáo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="main-content" ref={contentRef}>

                {/* What is Corruption Section */}
                <section className={`content-section ${isVisible ? 'animate-in' : ''}`} id="about">
                    <div className="section-header">
                        <span className="section-number">01</span>
                        <h2 className="section-title">THAM NHŨNG LÀ GÌ?</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="definition-grid">
                        <div className="definition-card main-definition">
                            <div className="card-icon">⚖️</div>
                            <h3>Định nghĩa chính thức</h3>
                            <p>
                                <strong>Tham nhũng</strong> là hành vi của người có chức vụ, quyền hạn đã lợi dụng
                                chức vụ, quyền hạn đó vì vụ lợi
                            </p>
                            <div className="source">Luật phòng, chống tham nhũng năm 2005</div>
                        </div>

                        <div className="characteristics-grid">
                            <div className="char-item">
                                <div className="char-icon">👤</div>
                                <h4>Chủ thể</h4>
                                <p>Người có chức vụ, quyền hạn</p>
                            </div>
                            <div className="char-item">
                                <div className="char-icon">🎯</div>
                                <h4>Phương thức</h4>
                                <p>Lợi dụng chức vụ, quyền hạn</p>
                            </div>
                            <div className="char-item">
                                <div className="char-icon">💰</div>
                                <h4>Động cơ</h4>
                                <p>Vì vụ lợi cá nhân</p>
                            </div>
                        </div>
                    </div>

                    <div className="corruption-types">
                        <h3>Các hành vi tham nhũng phổ biến</h3>
                        <div className="types-grid">
                            <div className="type-card">
                                <span className="type-number">1</span>
                                <h4>Tham ô tài sản</h4>
                                <p>Lợi dụng chức vụ chiếm đoạt tài sản mà mình có trách nhiệm quản lý</p>
                            </div>
                            <div className="type-card">
                                <span className="type-number">2</span>
                                <h4>Nhận hối lộ</h4>
                                <p>Nhận tiền, tài sản để làm hoặc không làm một việc vì lợi ích người đưa</p>
                            </div>
                            <div className="type-card">
                                <span className="type-number">3</span>
                                <h4>Lạm dụng chức vụ</h4>
                                <p>Vượt quá quyền hạn để chiếm đoạt tài sản của người khác</p>
                            </div>
                            <div className="type-card">
                                <span className="type-number">4</span>
                                <h4>Nhũng nhiễu</h4>
                                <p>Gây khó khăn, yêu sách để nhận lợi ích bất chính</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Protection of Regime Section */}
                <section className={`content-section dark-section ${isVisible ? 'animate-in' : ''}`} id="protection">
                    <div className="section-header">
                        <span className="section-number">02</span>
                        <h2 className="section-title">BẢO VỆ CHỂ ĐỘ - XÂY DỰNG NHÀ NƯỚC PHÁP QUYỀN</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="protection-content">
                        <div className="protection-intro">
                            <div className="intro-icon">🏛️</div>
                            <div className="intro-text">
                                <h3>Tầm quan trọng chiến lược</h3>
                                <p>
                                    Phòng, chống tham nhũng không chỉ có mục đích làm giảm vi phạm pháp luật
                                    mà còn có ý nghĩa quan trọng bảo vệ sự vững mạnh của chế độ xã hội chủ nghĩa ở Việt Nam.
                                </p>
                            </div>
                        </div>

                        <div className="significance-grid">
                            <div className="significance-item">
                                <div className="sig-header">
                                    <div className="sig-icon">🛡️</div>
                                    <h4>Bảo vệ chế độ</h4>
                                </div>
                                <ul>
                                    <li>Ngăn chặn sự "mục nát" của bộ máy nhà nước</li>
                                    <li>Chống lại sự tha hoá, biến chất của quan chức</li>
                                    <li>Duy trì bản chất của Đảng và Nhà nước</li>
                                </ul>
                            </div>

                            <div className="significance-item">
                                <div className="sig-header">
                                    <div className="sig-icon">⚖️</div>
                                    <h4>Xây dựng nhà nước pháp quyền</h4>
                                </div>
                                <ul>
                                    <li>Đảm bảo công bằng, dân chủ trong xã hội</li>
                                    <li>Nâng cao hiệu lực, hiệu quả quản lý nhà nước</li>
                                    <li>Tăng cường pháp chế xã hội chủ nghĩa</li>
                                </ul>
                            </div>

                            <div className="significance-item">
                                <div className="sig-header">
                                    <div className="sig-icon">💪</div>
                                    <h4>Củng cố niềm tin nhân dân</h4>
                                </div>
                                <ul>
                                    <li>Khôi phục lòng tin vào Đảng, Nhà nước</li>
                                    <li>Tăng cường sự ủng hộ của nhân dân</li>
                                    <li>Đảm bảo sự ổn định chính trị - xã hội</li>
                                </ul>
                            </div>
                        </div>

                        <div className="commitment-box">
                            <div className="commitment-icon">🇻🇳</div>
                            <div className="commitment-content">
                                <h4>Cam kết của Đảng Cộng sản Việt Nam</h4>
                                <div className="commitment-points">
                                    <span>✓ Quyết tâm chính trị cao nhất</span>
                                    <span>✓ Hành động quyết liệt, đồng bộ</span>
                                    <span>✓ Xây dựng Việt Nam trong sạch</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Citizen Responsibility Section */}
                <section className={`content-section ${isVisible ? 'animate-in' : ''}`} id="responsibility">
                    <div className="section-header">
                        <span className="section-number">03</span>
                        <h2 className="section-title">TRÁCH NHIỆM CỦA CÔNG DÂN</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="responsibility-intro">
                        <p>
                            Việc phòng, chống tham nhũng không chỉ là trách nhiệm của các cơ quan Nhà nước,
                            tổ chức xã hội mà còn là trách nhiệm của mỗi công dân.
                        </p>
                    </div>

                    <div className="responsibility-types">
                        <div className="resp-type">
                            <h3>
                                <span className="resp-icon">👥</span>
                                Công dân bình thường
                            </h3>
                            <div className="resp-grid">
                                <div className="resp-item">
                                    <div className="resp-number">1</div>
                                    <div className="resp-content">
                                        <h4>Chấp hành pháp luật</h4>
                                        <p>Nghiêm chỉnh tuân thủ pháp luật về phòng, chống tham nhũng</p>
                                    </div>
                                </div>
                                <div className="resp-item">
                                    <div className="resp-number">2</div>
                                    <div className="resp-content">
                                        <h4>Lên án, đấu tranh</h4>
                                        <p>Kiên quyết phê phán, lên án các hành vi tham nhũng</p>
                                    </div>
                                </div>
                                <div className="resp-item">
                                    <div className="resp-number">3</div>
                                    <div className="resp-content">
                                        <h4>Phát hiện, tố cáo</h4>
                                        <p>Tích cực phát hiện và tố cáo hành vi tham nhũng</p>
                                    </div>
                                </div>
                                <div className="resp-item">
                                    <div className="resp-number">4</div>
                                    <div className="resp-content">
                                        <h4>Hợp tác với cơ quan chức năng</h4>
                                        <p>Hỗ trợ trong việc xác minh, xử lý hành vi tham nhũng</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="resp-type">
                            <h3>
                                <span className="resp-icon">🏢</span>
                                Cán bộ, công chức, viên chức
                            </h3>
                            <div className="resp-special">
                                <div className="special-item">
                                    <h4>Trách nhiệm đặc biệt</h4>
                                    <ul>
                                        <li>Thực hiện quy tắc ứng xử của cán bộ, công chức</li>
                                        <li>Báo cáo ngay khi phát hiện dấu hiệu tham nhũng</li>
                                        <li>Chấp hành quyết định chuyển đổi vị trí công tác</li>
                                        <li>Kê khai tài sản theo quy định</li>
                                    </ul>
                                </div>
                                <div className="special-item">
                                    <h4>Người lãnh đạo, quản lý</h4>
                                    <ul>
                                        <li>Tổ chức kiểm tra việc chấp hành pháp luật</li>
                                        <li>Xử lý kịp thời các hành vi vi phạm</li>
                                        <li>Chịu trách nhiệm về việc để xảy ra tham nhũng</li>
                                        <li>Tiếp nhận và giải quyết tố cáo tham nhũng</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="action-call">
                        <div className="action-content">
                            <h3>Hành động ngay hôm nay!</h3>
                            <p>Mỗi công dân đều có thể góp phần xây dựng một Việt Nam trong sạch</p>
                            <div className="action-buttons">
                                <button className="action-btn primary">Báo cáo tham nhũng</button>
                                <button className="action-btn secondary">Tìm hiểu thêm</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Trang web giáo dục về phòng chống tham nhũng. Tất cả quyền được bảo lưu.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;