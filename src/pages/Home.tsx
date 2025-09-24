import React, { useState, useEffect } from 'react';
import './Home.css';

// Import ảnh hoa từ assets
import flower1 from '../assets/1.jpg';
import flower2 from '../assets/2.jpg';
import flower3 from '../assets/3.jpeg';
import flower4 from '../assets/4.jpg';
import coverImage from '../assets/corver-bac-trong.jpg';

const Home: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isVisible, setIsVisible] = useState<boolean[]>([]);
    const [contentVisible, setContentVisible] = useState<boolean[]>([]);

    const storyBlocks = [
        {
            id: 1,
            title: "Vẻ Đẹp Thiên Nhiên",
            subtitle: "Khám phá thế giới hoa tươi",
            description: "Mỗi bông hoa là một tác phẩm nghệ thuật của thiên nhiên, mang trong mình vẻ đ��p thuần khiết và hương thơm ngọt ngào.",
            image: flower1,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            title: "Sắc Màu Rực Rỡ",
            subtitle: "Bảng màu của đất trời",
            description: "Từ những tông màu pastel dịu dàng đến những sắc độ rực rỡ, hoa luôn biết cách tô điểm cho cuộc sống thêm đầy màu sắc.",
            image: flower2,
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 3,
            title: "Hương Thơm Quyến Rũ",
            subtitle: "Nước hoa của thiên nhiên",
            description: "Mỗi loài hoa đều có một hương thơm riêng biệt, như những nốt nhạc tạo nên bản giao hưởng tuyệt vời của mùa xuân.",
            image: flower3,
            gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
        },
        {
            id: 4,
            title: "Vẻ Đẹp Vĩnh Cửu",
            subtitle: "Tình yêu không bao giờ tàn phai",
            description: "Dù thời gian có trôi qua, vẻ đẹp của hoa luôn được lưu giữ trong trái tim và ký ức của chúng ta.",
            image: flower4,
            gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute('data-index') || '0');
                    if (entry.isIntersecting) {
                        setIsVisible(prev => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            return newVisible;
                        });
                        setCurrentSection(index);
                    }
                });
            },
            { threshold: 0.3 }
        );

        // Content section observer
        const contentObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute('data-content-index') || '0');
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setContentVisible(prev => {
                                const newVisible = [...prev];
                                newVisible[index] = true;
                                return newVisible;
                            });
                        }, index * 200); // Staggered animation
                    }
                });
            },
            { threshold: 0.2 }
        );

        const sections = document.querySelectorAll('.story-block');
        const contentBlocks = document.querySelectorAll('.content-block');

        sections.forEach((section) => observer.observe(section));
        contentBlocks.forEach((block) => contentObserver.observe(block));

        return () => {
            observer.disconnect();
            contentObserver.disconnect();
        };
    }, []);

    return (
        <div className="home-container">
            {/* Cover Section */}
            <section className="cover-section">
                <img src={coverImage} alt="Cover" className="cover-image" />
                <div className="cover-source">source: báo Hà Nội mới</div>
            </section>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="title-line title-main">
                            <span className="title-underlined">Tham nhũng</span>
                            <span className="title-question">là gì?</span>
                        </span>
                    </h1>
                    <div className="scroll-indicator">
                        <div className="scroll-arrow"></div>
                    </div>
                </div>
                <div className="hero-bg-overlay"></div>
                <div className="hero-decorations">
                    <div className="decoration-ring ring-1"></div>
                    <div className="decoration-ring ring-2"></div>
                    <div className="decoration-ring ring-3"></div>
                    <div className="decoration-dots">
                        <div className="dot dot-1"></div>
                        <div className="dot dot-2"></div>
                        <div className="dot dot-3"></div>
                        <div className="dot dot-4"></div>
                    </div>
                </div>
            </section>

            {/* Content Section - Corruption Definition */}
            <section className="content-section">
                <div className="content-container">
                    {/* World Bank Definition */}
                    <div
                        className={`content-block ${contentVisible[0] ? 'fade-in' : ''}`}
                        data-content-index="0"
                        data-animation-delay="0"
                    >
                        <div className="content-number">01</div>
                        <h2 className="content-title">Quan điểm Ngân hàng Thế giới</h2>
                        <div className="quote-box">
                            <div className="quote-icon">"</div>
                            <p className="quote-text">
                                Tham nhũng là sự <span className="quote-highlight">"lạm dụng quyền lực công cộng nhằm lợi ích cá nhân"</span>
                            </p>
                            <div className="quote-source">- Ngân hàng Thế Giới (World Bank)</div>
                        </div>
                    </div>

                    {/* Transparency International Definition */}
                    <div
                        className={`content-block ${contentVisible[1] ? 'fade-in' : ''}`}
                        data-content-index="1"
                        data-animation-delay="200"
                    >
                        <div className="content-number">02</div>
                        <h2 className="content-title">Quan điểm Tổ chức Minh bạch Quốc tế</h2>
                        <div className="quote-box transparency">
                            <div className="quote-icon">"</div>
                            <p className="quote-text">
                                Tham nhũng là hành vi <span className="quote-highlight">"của người lạm dụng chức vụ, quyền hạn,
                                hoặc cố ý làm trái pháp luật để phục vụ cho lợi ích cá nhân"</span>
                            </p>
                            <div className="quote-source">- Transparency International (TI)</div>
                        </div>
                    </div>

                    {/* Vietnam 1998 Definition */}
                    <div
                        className={`content-block ${contentVisible[2] ? 'fade-in' : ''}`}
                        data-content-index="2"
                        data-animation-delay="400"
                    >
                        <div className="content-number">03</div>
                        <h2 className="content-title">Pháp lệnh chống tham nhũng Việt Nam 1998</h2>
                        <div className="vietnam-definition">
                            <p>
                                Tham nhũng <span className="highlight-text">"là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ,
                                quyền hạn đó để tham ô, hối lộ hoặc cố ý làm trái pháp luật vì động cơ vụ lợi,
                                gây thiệt hại cho tài sản của Nhà nước, tập thể và cá nhân, xâm phạm hoạt động đúng đắn của các cơ quan, tổ chức"</span>
                            </p>
                        </div>
                    </div>

                    {/* Vietnam 2005 Definition */}
                    <div
                        className={`content-block ${contentVisible[3] ? 'fade-in' : ''}`}
                        data-content-index="3"
                        data-animation-delay="600"
                    >
                        <div className="content-number">04</div>
                        <h2 className="content-title">Luật phòng, chống tham nhũng Việt Nam 2005</h2>
                        <div className="vietnam-definition modern">
                            <p>
                                Theo quy định tại khoản 2 Điều 1, khái niệm <span className="highlight-text">"tham nhũng"</span> được hiểu:
                                <span className="emphasis-text">"là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi"</span>
                            </p>
                        </div>
                    </div>

                    {/* Introduction - moved to bottom */}
                    <div
                        className={`content-block ${contentVisible[4] ? 'fade-in' : ''}`}
                        data-content-index="4"
                        data-animation-delay="800"
                    >
                        <div className="content-number">05</div>
                        <h2 className="content-title">Khái niệm chung</h2>
                        <div className="content-text">
                            <p>
                                <span className="highlight-text">Tham nhũng</span> là một hiện tượng xã hội có tính lịch sử,
                                là một biểu hiện của sự <span className="emphasis-text">lợi dụng hay lạm dụng quyền lực nhà nước</span>,
                                vì vậy, nó gắn liền với quyền lực nhà nước và được thực hiện bởi chủ thể được nhà nước trao quyền.
                            </p>
                            <p>
                                Ở các quốc gia khác nhau, biểu hiện của hành vi tham nhũng và quan niệm về tham nhũng cũng khác nhau.
                            </p>
                        </div>
                        <div className="decorative-line"></div>
                    </div>

                    {/* Conclusion */}
                    <div
                        className={`content-block conclusion ${contentVisible[5] ? 'fade-in' : ''}`}
                        data-content-index="5"
                        data-animation-delay="1000"
                    >
                        <div className="conclusion-icon">→</div>
                        <h2 className="conclusion-title">Định nghĩa</h2>
                        <div className="conclusion-box">
                            <p>
                                Trong ngôn ngữ thông thường và ngôn ngữ luật pháp, khái niệm <span className="highlight-text">"tham nhũng"</span>
                                có thể được hiểu theo những cách khác nhau. Tuy nhiên, trên cơ sở quy định của pháp luật về tham nhũng,
                                chúng ta có thể định nghĩa khái quát về tham nhũng như sau:
                            </p>
                            <div className="final-definition">
                                <strong>
                                    Tham nhũng là hành vi của người có chức vụ, quyền hạn sử dụng chức vụ quyền hạn của mình
                                    làm trái pháp luật để mưu cầu lợi ích riêng.
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="content-decorations">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                    <div className="floating-shape shape-4"></div>
                </div>
            </section>

            {/* Corruption Characteristics Hero Section */}
            <section className="corruption-hero-section">
                <div className="corruption-hero-container">
                    <div className="corruption-hero-header">
                        <h2 className="corruption-hero-title">Đặc trưng của Tham nhũng</h2>
                    </div>

                    {/* Add Features Section */}
                    <div className="features-container">
                        <div className="feature-card">
                            <div className="feature-content">
                                <h3 className="feature-title">Lạm dụng quyền lực</h3>
                                <p className="feature-text">
                                    Sử dụng vị trí, chức vụ, quyền hạn được giao để thực hiện hành vi vì lợi ích cá nhân,
                                    đi ngược lại mục đích của việc trao quyền
                                </p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-content">
                                <h3 className="feature-title">Tính chất phi pháp</h3>
                                <p className="feature-text">
                                    Các hành vi tham nhũng đều vi phạm pháp luật, đi ngược lại các quy định và
                                    chuẩn mực đạo đức xã hội
                                </p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-content">
                                <h3 className="feature-title">Động cơ vụ lợi</h3>
                                <p className="feature-text">
                                    Mục đích cuối cùng của hành vi tham nhũng là nhằm đạt được các lợi ích
                                    vật chất hoặc phi vật chất cho cá nhân
                                </p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-content">
                                <h3 className="feature-title">Tính ẩn giấu</h3>
                                <p className="feature-text">
                                    Hành vi tham nhũng thường được thực hiện một cách kín đáo, được ngụy trang
                                    dưới các hoạt động hợp pháp
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Animation Elements */}
                <div className="corruption-hero-bg">
                    <div className="bg-circle circle-1"></div>
                    <div className="bg-circle circle-2"></div>
                    <div className="bg-circle circle-3"></div>
                    <div className="bg-wave wave-1"></div>
                    <div className="bg-wave wave-2"></div>
                </div>
            </section>

            {/* Causes of Corruption Section */}
            <section className="causes-section">
                <div className="causes-container">
                    <div className="causes-hero">
                        <h2 className="causes-title">Nguyên nhân của Tham nhũng</h2>
                        <p className="causes-subtitle">Tìm hiểu những nguyên nhân gốc rễ dẫn đến tình trạng tham nhũng trong xã hội</p>
                    </div>

                    <div className="causes-grid">
                        {/* Cause 1: Policy and Legal Limitations */}
                        <div className="cause-card" data-delay="0">
                            <h3 className="cause-title">Hạn chế trong chính sách, pháp luật</h3>
                            <div className="cause-content">
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong việc thực hiện các chính sách của Đảng và Nhà nước</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Sự thiếu hoàn thiện của hệ thống pháp luật</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Sự chồng chéo, mâu thuẫn trong các quy định của pháp luật</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Sự bất cập, thiếu minh bạch và kém khả thi trong nhiều quy định</span>
                                </div>
                            </div>
                        </div>

                        {/* Cause 2: Management and Administration Limitations */}
                        <div className="cause-card" data-delay="200">
                            <h3 className="cause-title">Hạn chế trong quản lí, điều hành</h3>
                            <div className="cause-content">
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong quản lí và điều hành nền kinh tế</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong việc phân công trách nhiệm, quyền hạn</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong việc công khai, minh bạch hóa các cơ chế quản lí</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Chính sách quản lí kinh tế còn chưa thực sự hợp lí</span>
                                </div>
                            </div>
                        </div>

                        {/* Cause 3: Detection and Processing Limitations */}
                        <div className="cause-card" data-delay="400">
                            <h3 className="cause-title">Hạn chế trong phát hiện và xử lí</h3>
                            <div className="cause-content">
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong việc khuyến khích tố giác hành vi tham nhũng</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong hoạt động của các cơ quan phát hiện tham nhũng</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong hoạt động của các cơ quan tư pháp hình sự</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong việc phối hợp hoạt động giữa các cơ quan</span>
                                </div>
                            </div>
                        </div>

                        {/* Cause 4: Personnel and Ideological Limitations */}
                        <div className="cause-card" data-delay="600">
                            <h3 className="cause-title">Hạn chế trong nhận thức, tư tưởng</h3>
                            <div className="cause-content">
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Sự xuống cấp về đạo đức, phẩm chất của cán bộ, công chức</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế trong công tác quy hoạch và bổ nhiệm cán bộ</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Thiếu minh bạch trong luân chuyển cán bộ</span>
                                </div>
                            </div>
                        </div>

                        {/* Cause 5: Education and Propaganda Limitations */}
                        <div className="cause-card" data-delay="800">
                            <h3 className="cause-title">Hạn chế trong tuyên truyền, giáo dục</h3>
                            <div className="cause-content">
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế về phạm vi thực hiện tuyên truyền</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế về hình thức tuyên truyền</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Hạn chế về nội dung tuyên truyền</span>
                                </div>
                                <div className="cause-item">
                                    <span className="item-bullet">•</span>
                                    <span>Thiếu hiệu quả trong phổ biến giáo dục pháp luật</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="causes-bg">
                    <div className="causes-bg-circle circle-1"></div>
                    <div className="causes-bg-circle circle-2"></div>
                    <div className="causes-bg-circle circle-3"></div>
                    <div className="causes-bg-wave"></div>
                </div>
            </section>

            {/* Story Blocks */}
            {storyBlocks.map((block, index) => (
                <section
                    key={block.id}
                    className={`story-block ${isVisible[index] ? 'visible' : ''} ${index % 2 === 1 ? 'reverse' : ''}`}
                    data-index={index}
                >
                    <div className="story-content">
                        <div className="story-text">
                            <div className="story-number">0{block.id}</div>
                            <h2 className="story-title">{block.title}</h2>
                            <h3 className="story-subtitle">{block.subtitle}</h3>
                            <p className="story-description">{block.description}</p>
                            <div className="story-divider"></div>
                        </div>
                        <div className="story-image-container">
                            <div className="image-wrapper">
                                <img src={block.image} alt={block.title} className="story-image" />
                                <div
                                    className="image-overlay"
                                    style={{ background: block.gradient }}
                                ></div>
                            </div>
                            <div className="floating-elements">
                                <div className="float-circle"></div>
                                <div className="float-square"></div>
                                <div className="float-triangle"></div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Progress Indicator */}
            <div className="progress-indicator">
                {storyBlocks.map((_, index) => (
                    <div
                        key={index}
                        className={`progress-dot ${currentSection === index ? 'active' : ''}`}
                    ></div>
                ))}
            </div>

            {/* Footer Section */}
            <section className="footer-section">
                <div className="footer-content">
                    <h2 className="footer-title">Cảm Ơn Bạn</h2>
                    <p className="footer-text">Đã cùng chúng tôi khám phá vẻ đẹp tuyệt vời của thế giới hoa</p>
                    <div className="footer-decoration">
                        <div className="decoration-line"></div>
                        <div className="decoration-dot"></div>
                        <div className="decoration-line"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
