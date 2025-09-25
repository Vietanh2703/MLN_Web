import React, { useState, useEffect } from 'react';
import './Home.css';

// Import ảnh hoa từ assets
import flower1 from '../assets/1.jpg';
import flower2 from '../assets/2.jpg';
import flower3 from '../assets/3.jpg';
import flower4 from '../assets/4.jpg';
import flower5 from '../assets/5.jpg';
import coverImage from '../assets/corver-bac-trong.jpg';

const Home: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isVisible, setIsVisible] = useState<boolean[]>([]);
    const [contentVisible, setContentVisible] = useState<boolean[]>([]);

    const storyBlocks = [
        {
            id: 1,
            title: "Vụ án Việt Á",
            subtitle: "Thổi giá kit xét nghiệm COVID-19",
            description: "Công ty Việt Á lợi dụng dịch bệnh để nâng khống giá bộ xét nghiệm, đưa hối lộ nhiều quan chức y tế. Vụ án gây chấn động, làm suy giảm niềm tin của công chúng và dẫn đến hàng loạt cán bộ bị xử lý.",
            image: flower1,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            link: "https://nhandan.vn/vu-an-viet-a-nang-khong-gia-kit-test-gay-thiet-hai-hon-400-ty-dong-cua-nha-nuoc-post790504.html"
        },
        {
            id: 2,
            title: "Vụ án PMU-18",
            subtitle: "Tham nhũng trong quản lý vốn ODA",
            description: "Xảy ra tại Bộ Giao thông Vận tải năm 2006, liên quan đến biển thủ, lạm dụng chức vụ và gian lận vốn ODA. Vụ án buộc nhiều quan chức cấp cao phải từ chức, làm dấy lên làn sóng phẫn nộ trong xã hội.",
            image: flower2,
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            link: "https://tuoitre.vn/lat-lai-ho-so-pmu18-ve-lai-chan-dung-bui-tien-dung-129419.htm"
        },
        {
            id: 3,
            title: "Vụ án Vinashin",
            subtitle: "Thất thoát hàng ngàn tỷ đồng",
            description: "Tập đoàn Công nghiệp tàu thủy Việt Nam quản lý yếu kém, sai phạm tài chính nghiêm trọng, gây nợ nần và phá sản. Nhà nước thiệt hại lớn, nhưng số tài sản thu hồi được rất thấp.",
            image: flower3,
            gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            link: "https://noichinh.vn/ho-so-tu-lieu/201205/vu-an-tai-tap-doan-kinh-te-vinashin-bai-hoc-trong-cong-tac-quan-ly-291151/"
        },
        {
            id: 4,
            title: "Vụ án Vạn Thịnh Phát – Trương Mỹ Lan",
            subtitle: "Siêu lừa đảo tài chính lớn nhất lịch sử",
            description: "Chủ tịch Vạn Thịnh Phát thao túng Ngân hàng SCB, thực hiện hàng ngàn khoản vay giả mạo, gây thiệt hại hàng chục tỷ USD. Đây là vụ án kinh tế – tham nhũng có quy mô và mức độ nghiêm trọng nhất Việt Nam.",
            image: flower4,
            gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            link: "https://xaydungchinhsach.chinhphu.vn/dai-an-van-thinh-phat-truy-to-truong-my-lan-va-85-bi-can-119231215145320997.htm"
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
                        <h2 className="corruption-hero-title">
                            <span className="title-line title-main">
                                <span className="title-underlined">Đặc trưng</span>
                                <span className="title-extend">của Tham nhũng</span>
                            </span>
                        </h2>
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
                        <h2 className="causes-title">
                            <span className="title-line title-main">
                                <span className="title-underlined">Nguyên nhân</span>
                                <span className="title-extend">của Tham nhũng</span>
                            </span>
                        </h2>
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

            {/* Consequences of Corruption Section */}
            <section className="consequences-section">
                <div className="consequences-container">
                    <div className="consequences-header">
                        <h2 className="consequences-title">
                            <span className="title-line title-main">
                                <span className="title-underlined">Hậu quả</span>
                                <span className="title-extend">của Tham nhũng</span>
                            </span>
                        </h2>
                    </div>

                    <div className="consequences-grid">
                        {/* Economic Consequences */}
                        <div className="consequence-group">
                            <h3 className="group-title">
                                <span className="group-icon">💰</span>
                                Hậu quả Kinh tế
                            </h3>
                            <div className="consequence-cards">
                                <div className="consequence-card" data-category="economic">
                                    <h4>Thiệt hại ngân sách</h4>
                                    <p>Gây thất thoát, lãng phí nguồn lực tài chính của nhà nước</p>
                                </div>
                                <div className="consequence-card" data-category="economic">
                                    <h4>Giảm đầu tư</h4>
                                    <p>Làm giảm niềm tin của nhà đầu tư, ảnh hưởng môi trường kinh doanh</p>
                                </div>
                                <div className="consequence-card" data-category="economic">
                                    <h4>Méo mó thị trường</h4>
                                    <p>Gây cạnh tranh không lành mạnh, ảnh hưởng đến hiệu quả phân bổ nguồn lực</p>
                                </div>
                            </div>
                        </div>

                        {/* Political Consequences */}
                        <div className="consequence-group">
                            <h3 className="group-title">
                                <span className="group-icon">⚖️</span>
                                Hậu quả Chính trị
                            </h3>
                            <div className="consequence-cards">
                                <div className="consequence-card" data-category="political">
                                    <h4>Suy giảm lòng tin</h4>
                                    <p>Làm giảm niềm tin của nhân dân vào Đảng và Nhà nước</p>
                                </div>
                                <div className="consequence-card" data-category="political">
                                    <h4>Xói mòn thể chế</h4>
                                    <p>Làm suy yếu hiệu lực, hiệu quả quản lý nhà nước</p>
                                </div>
                                <div className="consequence-card" data-category="political">
                                    <h4>Bất ổn chính trị</h4>
                                    <p>Gây mất ổn định chính trị, ảnh hưởng an ninh quốc gia</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Consequences */}
                        <div className="consequence-group">
                            <h3 className="group-title">
                                <span className="group-icon">👥</span>
                                Hậu quả Xã hội
                            </h3>
                            <div className="consequence-cards">
                                <div className="consequence-card" data-category="social">
                                    <h4>Bất công xã hội</h4>
                                    <p>Làm gia tăng bất bình đẳng và phân hóa giàu nghèo</p>
                                </div>
                                <div className="consequence-card" data-category="social">
                                    <h4>Suy thoái đạo đức</h4>
                                    <p>Làm xói mòn đạo đức, lối sống trong xã hội </p>
                                </div>
                                <div className="consequence-card" data-category="social">
                                    <h4>Mất đoàn kết</h4>
                                    <p>Phá vỡ mối quan hệ đoàn kết trong dân tộc cũng như tạo thời cơ cho các phần tử chống phá Nhà nước</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Blocks */}
            <section className="story-section">
                <div className="story-container">
                    <div className="story-header">
                        <h2 className="story-section-title">
                            <span className="title-line title-main">
                                <span className="title-underlined">Những vụ án</span>
                                <span className="title-extend">tiêu biểu</span>
                            </span>
                        </h2>
                    </div>
                </div>
            </section>

            {storyBlocks.map((block, index) => (
                <section
                    key={block.id}
                    className={`story-block ${isVisible[index] ? 'visible' : ''} ${index % 2 === 1 ? 'reverse' : ''}`}
                    data-index={index}
                >
                    <div className="story-content">
                        <div className="story-text">
                            <div className="story-number">0{block.id}</div>
                            <h2 className="story-title">
                                <a href={block.link} target="_blank" rel="noopener noreferrer" className="story-link">
                                    {block.title}
                                </a>
                            </h2>
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

            {/* Citizens' Responsibilities Section */}
            <section
                className="citizens-responsibility-section"
                style={{
                    minHeight: '120vh',
                    background: '#ffffff',
                    padding: '8rem 2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div
                    className="citizens-container"
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <div
                        className="citizens-hero"
                        style={{
                            textAlign: 'center',
                            marginBottom: '6rem',
                            opacity: 1,
                            transform: 'translateY(0)',
                            animation: 'citizensHeroAppear 1.5s ease-out forwards'
                        }}
                    >
                        <h2
                            className="citizens-title"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                marginBottom: '1.5rem',
                                color: '#000000',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                position: 'relative'
                            }}
                        >
                            <span className="title-line title-main">
                                <span
                                    className="title-underlined"
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        marginRight: '1rem'
                                    }}
                                >
                                    Trách nhiệm
                                </span>
                                <span
                                    className="title-extend"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                        fontWeight: 700,
                                        color: '#fd0c0c',
                                        fontStyle: 'italic',
                                        animation: 'citizensTitleBounce 1.5s ease-out 1.2s forwards',
                                        opacity: 1,
                                        transform: 'scale(1)'
                                    }}
                                >
                                    của Người dân
                                </span>
                            </span>
                        </h2>
                        <p
                            className="citizens-subtitle"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '1.2rem',
                                color: '#64748b',
                                fontStyle: 'italic',
                                marginTop: '1rem',
                                opacity: 1,
                                animation: 'citizensSubtitleFade 1s ease-out 1.5s forwards'
                            }}
                        >
                            Trong phòng chống tham nhũng, tiêu cực
                        </p>
                    </div>

                    <div
                        className="citizens-content-flow"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            maxWidth: '800px',
                            margin: '0 auto',
                            position: 'relative'
                        }}
                    >
                        <div
                            className="responsibility-item"
                            data-animate="left"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '25px',
                                border: '2px solid transparent',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                                position: 'relative',
                                opacity: 1,
                                transform: 'translateX(0)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'slideInFromLeft 1s ease-out 0.5s forwards'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(2, 132, 199, 0.15)';
                                e.currentTarget.style.borderColor = '#0284c7';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div
                                className="responsibility-icon"
                                style={{
                                    fontSize: '3.5rem',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
                                    position: 'relative',
                                    animation: 'responsibilityIconFloat 3s ease-in-out infinite'
                                }}
                            >
                                🔍
                            </div>
                            <div className="responsibility-text" style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '1.6rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '0.8rem',
                                        position: 'relative'
                                    }}
                                >
                                    Tích cực phát hiện
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        fontWeight: 400
                                    }}
                                >
                                    Chủ động phát hiện và cung cấp thông tin về các hành vi tham nhũng, tiêu cực cho cơ quan có thẩm quyền
                                </p>
                            </div>
                            <div
                                className="responsibility-decoration decoration-1"
                                style={{
                                    position: 'absolute',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    top: '-20px',
                                    right: '-20px',
                                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    animation: 'responsibilityDecorationFloat 4s ease-in-out infinite'
                                }}
                            />
                        </div>

                        <div
                            className="connecting-path path-1"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '100px',
                                position: 'relative',
                                opacity: 1,
                                animation: 'citizensPathAppear 1s ease-out 0.6s forwards'
                            }}
                        >
                            <svg
                                viewBox="0 0 300 100"
                                className="path-svg"
                                style={{
                                    width: '300px',
                                    height: '100px'
                                }}
                            >
                                <path
                                    d="M0,50 Q150,10 300,50"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                    className="animated-path"
                                    style={{
                                        strokeDasharray: '1000',
                                        strokeDashoffset: '0',
                                        animation: 'drawCitizensPath 2s ease-out 0.8s forwards'
                                    }}
                                />
                            </svg>
                        </div>

                        <div
                            className="responsibility-item"
                            data-animate="right"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '25px',
                                border: '2px solid transparent',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                                position: 'relative',
                                opacity: 1,
                                transform: 'translateX(0)',
                                flexDirection: 'row-reverse',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'slideInFromRight 1s ease-out 0.7s forwards'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(2, 132, 199, 0.15)';
                                e.currentTarget.style.borderColor = '#0284c7';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div
                                className="responsibility-icon"
                                style={{
                                    fontSize: '3.5rem',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
                                    position: 'relative',
                                    animation: 'responsibilityIconFloat 3s ease-in-out infinite'
                                }}
                            >
                                ⚖️
                            </div>
                            <div className="responsibility-text" style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '1.6rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '0.8rem',
                                        position: 'relative'
                                    }}
                                >
                                    Giám sát hoạt động
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        fontWeight: 400
                                    }}
                                >
                                    Tham gia giám sát việc thực hiện pháp luật và các hoạt động của cơ quan công quyền
                                </p>
                            </div>
                            <div
                                className="responsibility-decoration decoration-2"
                                style={{
                                    position: 'absolute',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    bottom: '-20px',
                                    left: '-20px',
                                    background: 'linear-gradient(135deg, #ec4899, #be185d)',
                                    animation: 'responsibilityDecorationFloat 4s ease-in-out infinite 1s'
                                }}
                            />
                        </div>

                        <div
                            className="connecting-path path-2"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '100px',
                                position: 'relative',
                                opacity: 1,
                                animation: 'citizensPathAppear 1s ease-out 0.8s forwards'
                            }}
                        >
                            <svg
                                viewBox="0 0 300 100"
                                className="path-svg"
                                style={{
                                    width: '300px',
                                    height: '100px'
                                }}
                            >
                                <path
                                    d="M0,50 Q150,90 300,50"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                    className="animated-path"
                                    style={{
                                        strokeDasharray: '1000',
                                        strokeDashoffset: '0',
                                        animation: 'drawCitizensPath 2s ease-out 1s forwards'
                                    }}
                                />
                            </svg>
                        </div>

                        <div
                            className="responsibility-item"
                            data-animate="left"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '25px',
                                border: '2px solid transparent',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                                position: 'relative',
                                opacity: 1,
                                transform: 'translateX(0)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'slideInFromLeft 1s ease-out 1s forwards'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(2, 132, 199, 0.15)';
                                e.currentTarget.style.borderColor = '#0284c7';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div
                                className="responsibility-icon"
                                style={{
                                    fontSize: '3.5rem',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
                                    position: 'relative',
                                    animation: 'responsibilityIconFloat 3s ease-in-out infinite'
                                }}
                            >
                                📢
                            </div>
                            <div className="responsibility-text" style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '1.6rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '0.8rem',
                                        position: 'relative'
                                    }}
                                >
                                    Tố cáo hành vi vi phạm
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        fontWeight: 400
                                    }}
                                >
                                    Kịp thời tố cáo các hành vi tham nhũng, tiêu cực đến cơ quan chức năng có thẩm quyền
                                </p>
                            </div>
                            <div
                                className="responsibility-decoration decoration-3"
                                style={{
                                    position: 'absolute',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    top: '-20px',
                                    right: '-20px',
                                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    animation: 'responsibilityDecorationFloat 4s ease-in-out infinite'
                                }}
                            />
                        </div>

                        <div
                            className="connecting-path path-3"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '100px',
                                position: 'relative',
                                opacity: 1,
                                animation: 'citizensPathAppear 1s ease-out 1.2s forwards'
                            }}
                        >
                            <svg
                                viewBox="0 0 300 100"
                                className="path-svg"
                                style={{
                                    width: '300px',
                                    height: '100px'
                                }}
                            >
                                <path
                                    d="M0,50 Q150,10 300,50"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                    className="animated-path"
                                    style={{
                                        strokeDasharray: '1000',
                                        strokeDashoffset: '0',
                                        animation: 'drawCitizensPath 2s ease-out 1.4s forwards'
                                    }}
                                />
                            </svg>
                        </div>

                        <div
                            className="responsibility-item"
                            data-animate="right"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '25px',
                                border: '2px solid transparent',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                                position: 'relative',
                                opacity: 1,
                                transform: 'translateX(0)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'slideInFromRight 1s ease-out 1.5s forwards'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(2, 132, 199, 0.15)';
                                e.currentTarget.style.borderColor = '#0284c7';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div
                                className="responsibility-icon"
                                style={{
                                    fontSize: '3.5rem',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
                                    position: 'relative',
                                    animation: 'responsibilityIconFloat 3s ease-in-out infinite'
                                }}
                            >
                                🤝
                            </div>
                            <div className="responsibility-text" style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '1.6rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '0.8rem',
                                        position: 'relative'
                                    }}
                                >
                                    Phối hợp với cơ quan chức năng
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        fontWeight: 400
                                    }}
                                >
                                    Tích cực phối hợp, cung cấp thông tin trong việc điều tra, xác minh các vụ việc tham nhũng
                                </p>
                            </div>
                            <div
                                className="responsibility-decoration decoration-4"
                                style={{
                                    position: 'absolute',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    top: '-20px',
                                    right: '-20px',
                                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    animation: 'responsibilityDecorationFloat 4s ease-in-out infinite'
                                }}
                            />
                        </div>

                        <div
                            className="connecting-path path-4"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '100px',
                                position: 'relative',
                                opacity: 1,
                                animation: 'citizensPathAppear 1s ease-out 1.6s forwards'
                            }}
                        >
                            <svg
                                viewBox="0 0 300 100"
                                className="path-svg"
                                style={{
                                    width: '300px',
                                    height: '100px'
                                }}
                            >
                                <path
                                    d="M0,50 Q150,90 300,50"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                    className="animated-path"
                                    style={{
                                        strokeDasharray: '1000',
                                        strokeDashoffset: '0',
                                        animation: 'drawCitizensPath 2s ease-out 1.8s forwards'
                                    }}
                                />
                            </svg>
                        </div>

                        <div
                            className="responsibility-item"
                            data-animate="left"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '25px',
                                border: '2px solid transparent',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                                position: 'relative',
                                opacity: 1,
                                transform: 'translateX(0)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'slideInFromLeft 1s ease-out 1.2s forwards'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(2, 132, 199, 0.15)';
                                e.currentTarget.style.borderColor = '#0284c7';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div
                                className="responsibility-icon"
                                style={{
                                    fontSize: '3.5rem',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
                                    position: 'relative',
                                    animation: 'responsibilityIconFloat 3s ease-in-out infinite'
                                }}
                            >
                                📚
                            </div>
                            <div className="responsibility-text" style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '1.6rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '0.8rem',
                                        position: 'relative'
                                    }}
                                >
                                    Tuyên truyền, vận động
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        fontWeight: 400
                                    }}
                                >
                                    Tuyên truyền, vận động mọi người cùng thực hiện pháp luật về phòng, chống tham nhũng
                                </p>
                            </div>
                            <div
                                className="responsibility-decoration decoration-5"
                                style={{
                                    position: 'absolute',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    top: '-20px',
                                    right: '-20px',
                                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    animation: 'responsibilityDecorationFloat 4s ease-in-out infinite'
                                }}
                            />
                        </div>

                        <div
                            className="connecting-path path-5"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '100px',
                                position: 'relative',
                                opacity: 1,
                                animation: 'citizensPathAppear 1s ease-out 2s forwards'
                            }}
                        >
                            <svg
                                viewBox="0 0 300 100"
                                className="path-svg"
                                style={{
                                    width: '300px',
                                    height: '100px'
                                }}
                            >
                                <path
                                    d="M0,50 Q150,10 300,50"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                    className="animated-path"
                                    style={{
                                        strokeDasharray: '1000',
                                        strokeDashoffset: '0',
                                        animation: 'drawCitizensPath 2s ease-out 2.2s forwards'
                                    }}
                                />
                            </svg>
                        </div>

                        <div
                            className="responsibility-item"
                            data-animate="center"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '25px',
                                border: '2px solid transparent',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                                position: 'relative',
                                opacity: 1,
                                transform: 'translateY(0)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: 'slideInFromBottom 1s ease-out 2.5s forwards'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(2, 132, 199, 0.15)';
                                e.currentTarget.style.borderColor = '#0284c7';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div
                                className="responsibility-icon"
                                style={{
                                    fontSize: '3.5rem',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
                                    position: 'relative',
                                    animation: 'responsibilityIconFloat 3s ease-in-out infinite'
                                }}
                            >
                                📋
                            </div>
                            <div className="responsibility-text" style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '1.6rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '0.8rem',
                                        position: 'relative'
                                    }}
                                >
                                    Tuân thủ pháp luật
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        fontWeight: 400
                                    }}
                                >
                                    Nghiêm chỉnh chấp hành và thực hiện các quy định của pháp luật về phòng, chống tham nhũng
                                </p>
                            </div>
                            <div
                                className="responsibility-decoration decoration-6"
                                style={{
                                    position: 'absolute',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    top: '-20px',
                                    right: '-20px',
                                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    animation: 'responsibilityDecorationFloat 4s ease-in-out infinite'
                                }}
                            />
                        </div>
                    </div>

                    <div
                        className="citizens-floating-elements"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                    >
                        <div
                            className="floating-shape shape-circle"
                            style={{
                                position: 'absolute',
                                opacity: 0.4,
                                width: '120px',
                                height: '120px',
                                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(3, 105, 161, 0.1) 100%)',
                                borderRadius: '50%',
                                top: '15%',
                                left: '5%',
                                animation: 'citizensShapeFloat 8s ease-in-out infinite',
                                animationDuration: '10s'
                            }}
                        />
                        <div
                            className="floating-shape shape-triangle"
                            style={{
                                position: 'absolute',
                                opacity: 0.4,
                                width: 0,
                                height: 0,
                                borderLeft: '50px solid transparent',
                                borderRight: '50px solid transparent',
                                borderBottom: '86.6px solid rgba(2, 132, 199, 0.1)',
                                top: '60%',
                                right: '10%',
                                animation: 'citizensShapeFloat 8s ease-in-out infinite',
                                animationDuration: '12s',
                                animationDelay: '2s'
                            }}
                        />
                        <div
                            className="floating-particles"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="particle"
                                    style={{
                                        position: 'absolute',
                                        width: '6px',
                                        height: '6px',
                                        background: '#0284c7',
                                        borderRadius: '50%',
                                        opacity: 0.6,
                                        animation: 'citizensParticleFloat 6s ease-in-out infinite',
                                        animationDelay: `${i * 1.2}s`,
                                        top: `${20 + i * 15}%`,
                                        left: `${20 + i * 10}%`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes citizensHeroAppear {
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes citizensTitleBounce {
                        0% {
                            opacity: 0;
                            transform: scale(0.5);
                        }
                        60% {
                            opacity: 1;
                            transform: scale(1.1);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }

                    @keyframes citizensSubtitleFade {
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes slideInFromLeft {
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes slideInFromRight {
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes responsibilityIconFloat {
                        0%, 100% {
                            transform: translateY(0) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-10px) rotate(5deg);
                        }
                    }

                    @keyframes responsibilityDecorationFloat {
                        0%, 100% {
                            transform: translateY(0) scale(1);
                        }
                        50% {
                            transform: translateY(-15px) scale(1.1);
                        }
                    }

                    @keyframes citizensPathAppear {
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes drawCitizensPath {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }

                    @keyframes citizensShapeFloat {
                        0%, 100% {
                            transform: translateY(0) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-30px) rotate(10deg);
                        }
                    }

                    @keyframes citizensParticleFloat {
                        0%, 100% {
                            transform: translateY(0) scale(1);
                            opacity: 0.6;
                        }
                        50% {
                            transform: translateY(-20px) scale(1.2);
                            opacity: 1;
                        }
                    }

                    .title-underlined::after {
                        content: '';
                        position: absolute;
                        bottom: -10px;
                        left: 0;
                        width: 100%;
                        height: 4px;
                        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
                        border-radius: 2px;
                        animation: citizensUnderlineExpand 2s ease-out 0.8s forwards;
                        transform-origin: left;
                        scale: 1 1;
                    }

                    @keyframes citizensUnderlineExpand {
                        to {
                            scale: 1 1;
                        }
                    }

                    @media (max-width: 768px) {
                        .responsibility-item {
                            flex-direction: column !important;
                            text-align: center;
                            padding: 2rem;
                            gap: 1.5rem;
                        }

                        .responsibility-icon {
                            width: 80px;
                            height: 80px;
                            font-size: 2.5rem;
                        }
                    }
                `}</style>
            </section>

            {/* Image Section - 5.jpg */}
            <section
                className="image-section-5"
                style={{
                    minHeight: '60vh',
                    background: '#f8fafc',
                    padding: '0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div
                    className="image-container-5"
                    style={{
                        width: '100vw',
                        position: 'relative',
                        borderRadius: '0',
                        overflow: 'hidden',
                        boxShadow: 'none',
                        animation: 'fadeInScale 1.5s ease-out forwards'
                    }}
                >
                    <img
                        src={flower5}
                        alt="Phòng chống tham nhũng"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    />
                    <div
                        className="image-overlay-5"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                            padding: '2rem',
                            color: 'white'
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.9rem',
                                opacity: 0.9,
                                margin: 0,
                                textAlign: 'right'
                            }}
                        >
                            Nguồn: Tài liệu tham khảo
                        </p>
                    </div>
                </div>

                <style>{`
                    @keyframes fadeInScale {
                        from {
                            opacity: 0;
                            transform: scale(0.9);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                `}</style>
            </section>

            {/* Footer */}
            <footer
                style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '2rem 0',
                    textAlign: 'center'
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 2rem'
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.9rem',
                            margin: 0,
                            opacity: 0.8
                        }}
                    >
                        © Vietanh2703
                    </p>
                </div>
            </footer>

        </div>
    );
};

export default Home;
