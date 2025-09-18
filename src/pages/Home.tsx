import React, {useState, useEffect, useRef} from 'react';
import Navbar from '../components/Navbar';
import './Home.css';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpeg';
import image4 from '../assets/4.jpg';

const Home: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // 6 ảnh mẫu (placeholder images)
    const images: string[] = [
        image1,
        image2,
        image3,
        image4,
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=600&fit=crop',
        'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=1200&h=600&fit=crop'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000); // 5 giây

        return () => clearInterval(interval);
    }, [images.length]);
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

    const handleDotClick = (index: number): void => {
        setCurrentSlide(index);
    };

    return (
        <div className="home-container">
            <Navbar />

            {/* Hero Slideshow */}
            <div className="hero-slideshow">
                <div
                    className="slideshow-wrapper"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="slide"
                        >
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="slide-image"
                            />
                            <div className="slide-overlay"></div>
                        </div>
                    ))}
                </div>

                {/* Rectangle indicators */}
                <div className="dots-container">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`rectangle-indicator ${currentSlide === index ? 'rectangle-active' : ''}`}
                        />
                    ))}
                </div>
            </div>
            <section className="content-section" ref={contentRef}>
                <div className="container">
                    {/* Header Section */}
                    <div className={`content-header ${isVisible ? 'animate-fadeIn' : ''}`}>
                        <h2 className="main-title">Tham nhũng và Công cuộc Chống tham nhũng</h2>
                        <p className="main-subtitle">Đảng Cộng sản Việt Nam quyết tâm xây dựng một xã hội trong sạch, minh bạch</p>
                    </div>

                    {/* Mind Map Section */}
                    <div className={`mind-map-container ${isVisible ? 'animate-slideUp' : ''}`}>
                        <div className="central-node">
                            <div className="central-circle">
                                <h3>THAM NHŨNG</h3>
                                <p>Là gì?</p>
                            </div>

                            {/* Branches */}
                            <div className="branch branch-1">
                                <div className="branch-line"></div>
                                <div className="branch-node">
                                    <div className="node-icon">⚖️</div>
                                    <h4>Định nghĩa</h4>
                                    <p>Lạm dụng quyền lực được giao phó để thu lợi cá nhân</p>
                                </div>
                            </div>

                            <div className="branch branch-2">
                                <div className="branch-line"></div>
                                <div className="branch-node">
                                    <div className="node-icon">💰</div>
                                    <h4>Hình thức</h4>
                                    <p>Nhận hối lộ, tham ô, lạm quyền, móc nối</p>
                                </div>
                            </div>

                            <div className="branch branch-3">
                                <div className="branch-line"></div>
                                <div className="branch-node">
                                    <div className="node-icon">📉</div>
                                    <h4>Tác hại</h4>
                                    <p>Làm suy yếu niềm tin, cản trở phát triển</p>
                                </div>
                            </div>

                            <div className="branch branch-4">
                                <div className="branch-line"></div>
                                <div className="branch-node">
                                    <div className="node-icon">🛡️</div>
                                    <h4>Phòng chống</h4>
                                    <p>Giáo dục, thanh tra, xử lý nghiêm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Anti-corruption Efforts */}
                    <div className={`anti-corruption-section ${isVisible ? 'animate-fadeIn' : ''}`}>
                        <h3 className="section-title">Nỗ lực chống tham nhũng của Đảng Cộng sản Việt Nam</h3>

                        <div className="efforts-grid">
                            <div className="effort-card card-1">
                                <div className="card-icon">🏛️</div>
                                <h4>Xây dựng thể chế</h4>
                                <p>Hoàn thiện hệ thống pháp luật, quy định về phòng chống tham nhũng</p>
                                <div className="card-glow"></div>
                            </div>

                            <div className="effort-card card-2">
                                <div className="card-icon">🔍</div>
                                <h4>Tăng cường kiểm tra</h4>
                                <p>Thanh tra, kiểm tra định kỳ và đột xuất các cơ quan, tổ chức</p>
                                <div className="card-glow"></div>
                            </div>

                            <div className="effort-card card-3">
                                <div className="card-icon">⚡</div>
                                <h4>Xử lý nghiêm minh</h4>
                                <p>Không có vùng cấm, không có ngoại lệ trong xử lý tham nhũng</p>
                                <div className="card-glow"></div>
                            </div>

                            <div className="effort-card card-4">
                                <div className="card-icon">💡</div>
                                <h4>Minh bạch thông tin</h4>
                                <p>Công khai quy trình, kết quả, tạo sự giám sát của nhân dân</p>
                                <div className="card-glow"></div>
                            </div>
                        </div>
                    </div>

                    {/* Quote Section */}
                    <div className={`quote-section ${isVisible ? 'animate-slideUp' : ''}`}>
                        <div className="quote-container">
                            <div className="quote-mark">"</div>
                            <p className="quote-text">
                                Chống tham nhũng là cuộc đấu tranh lâu dài, phức tạp, đòi hỏi sự quyết tâm cao của toàn Đảng, toàn dân
                            </p>
                            <div className="quote-author">- Đảng Cộng sản Việt Nam</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h3>LOGO</h3>
                        </div>
                        <div className="footer-text">
                            <p>&copy; 2024 Trang web giáo dục về chống tham nhũng. Tất cả quyền được bảo lưu.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;