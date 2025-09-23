import React, { useState, useEffect, useMemo, useCallback } from 'react'
import './QuizPage.css';

type Choice = {
    id: string
    text: string
}

type Question = {
    id: string
    text: string
    choices: Choice[]
    correctId: string
    explanation?: string
}

const questionBank: Question[] = [
    {
        id: 'q1',
        text: 'Thế nào là tham nhũng?',
        choices: [
            { id: 'a', text: 'Tham nhũng là hành vi của cán bộ, công chức nhà nước đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi' },
            { id: 'b', text: 'Tham nhũng là hành vi lợi dụng chức vụ, quyền hạn để vụ lợi.' },
            { id: 'c', text: 'Tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi' },
            { id: 'd', text: 'Tham nhung là hành vi cửa quyền, hách dịch, đòi hỏi, gây khó khăn, phiền hà của nguời có chức vụ, quyền hạn trong khi thực hiện nhiệm vụ, công việc.' },
        ],
        correctId: 'c',
        explanation: 'Tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi.' +
            'Người có chức vụ, quyền hạn là người do bỗ nhiệm, do bầu cử, do tuyễn dụng, do hợp đồng hoặc do một hình thức khác, có hưởng lương hoặc\n' +
            'không hưởng lương, được giao thực hiện nhiệm vụ, công vụ nhất định và có quyền hạn nhất định trong khi thực hiện nhiệm vụ, công vụ đó, bao gồm:' +
            'a) Cán bộ, công chức, viên chức;' +
            'b) Sĩ quan, quân nhân chuyên nghiệp, công nhân, viên chức quốc phòng trong cơ quan, đơn vị thuộc Quân đội nhân dân; sĩ quan, hạ sĩ quan nghiệp vụ,\n' +
            'sĩ quan, hạ sĩ quan chuyên môn kỹ thuật, công nhân công an trong cơ quan, đơn vị thuộc Công an nhân dân;' +
            'c) Người đại diện phần vốn nhà nước tại doanh nghiệp;' +
            'd) Người giữ chức danh, chức vụ quản lý trong doanh nghiệp, tổ chức;' +
            'đ) Những người khác được giao thực hiện nhiệm vụ, công vụ và có quyền hạn trong khi thực hiện nhiệm vụ, công vụ đó.'
    },
    {
        id: 'q2',
        text: 'Công dân có quyền gì trong công tác phòng, chống tham nhũng?',
        choices: [
            { id: 'a', text: 'Công dân chỉ có quyền phát hiện nhà báo tin về hành vi tham nhũng' },
            { id: 'b', text: 'Công dân chỉ có quyền giám sát việc thực hiện pháp luật về phòng, chống tham nhũng.' },
            { id: 'c', text: 'Công dân chỉ có quyền phát hiện, kiến nghị với cơ quan nhà nước hoàn thiện pháp luật về phòng, chống tham nhũng và giám sát việc thực hiện pháp luật về phòng, chống tham nhũng.' },
            { id: 'd', text: 'Công dân có quyền phát hiện, phản ánh, tố cáo, tố giác, báo tin về hành vi tham nhung và được bảo vệ, khen thưởng theo quy định của pháp luật; có quyền kiến nghị với cơ quan nhà nước hoàn thiện pháp luật về phòng, chống tham nhũng và giám sát việc thực hiện pháp luật về phòng, chống tham nhũng' },
        ],
        correctId: 'd',
        explanation: 'Điều 5. Quyền và nghĩa vụ của công dân trong phòng, chống tham nhũng\n' +
            '1. Công dân có quyền phát hiện, phản ánh, tố cáo, tố giác, báo tin về hành vi tham nhũng và được bảo vệ, khen thưởng theo quy định của pháp luật;\n' +
            'có quyền kiến nghị với cơ quan nhà nước hoàn thiện pháp luật về phòng, chống tham nhung và giám sát việc thực hiện pháp luật về phòng, chống\n' +
            'tham nhũng.\n' +
            '2. Công dân có nghĩa vụ hợp tác, giúp đỡ cơ quan, tỗ chức, cá nhân có thẩm quyền trong phòng, chống tham nhũng.'
    },
    {
        id: 'q3',
        text: 'Hành vi tham nhũng có thể xảy ra ở đâu?',
        choices: [
            { id: 'a', text: 'Trong cơ quan, tổ chức của nhà nước' },
            { id: 'b', text: 'Trong cơ quan, tổ chức, đơn vị khu vực nhà nước và doanh nghiệp, tổ chức khu vực ngoài nhà nước' },
            { id: 'c', text: 'Trong cơ quan nhà nước và doanh nghiệp nhà nước ' },
            { id: 'd', text: 'Trong doanh nghiệp, tổ chức khu vực ngoài nhà nước. ' },
        ],
        correctId: 'b',
        explanation: 'Điều 3 Luật Phòng, chống tham nhũng năm 2018 (được sửa đổi, bổ sung năm 2022).\n' +
            '1. Cơ quan, tổ chức, đơn vị, cá nhân có chức vụ, quyền hạn trong cơ quan, tổ chức, đơn vị khu vực nhà nước.\n' +
            '2. Cơ quan, tổ chức, đơn vị khu vực ngoài nhà nước bao gồm doanh nghiệp, tổ chức khác hoạt động vì lợi nhuận hoặc không vì lợi nhuận.\n' +
            '...'
    },
    {
        id: 'q4',
        text: 'Có bao nhiêu hành vi tham nhũng trong khu vực nhà nước?',
        choices: [
            { id: 'a', text: '03 hành vi' },
            { id: 'b', text: '05 hành vi' },
            { id: 'c', text: '07 hành vi' },
            { id: 'd', text: '12 hành vi' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 2 Luật Phòng, chống tham nhũng 2018 (sửa đổi 2022), có 12 hành vi tham nhũng trong khu vực nhà nước, bao gồm:\n Tham ô tài sản;\n Nhận hối lộ;\n Lạm dụng chức vụ, quyền hạn chiếm đoạt tài sản;\n Lợi dụng chức vụ, quyền hạn trong khi thi hành nhiệm vụ, công vụ vì vụ lợi;\n Lạm quyền trong khi thi hành nhiệm vụ, công vụ vì vụ lợi;\n Lợi dụng chức vụ, quyền hạn gây ảnh hưởng với người khác để trục lợi;\n Giả mạo trong công tác vì vụ lợi;\n Đưa hối lộ, môi giới hối lộ;\n Lợi dụng chức vụ, quyền hạn sử dụng trái phép tài sản công vì vụ lợi;\n Nhũng nhiễu vì vụ lợi;\n Không thực hiện nhiệm vụ, công vụ vì vụ lợi;\n Lợi dụng chức vụ, quyền hạn để che giấu, bao che, hỗ trợ cho người có hành vi vi phạm pháp luật vì vụ lợi;\n Cố ý không kê khai hoặc kê khai không trung thực tài sản, thu nhập.'
    },
    {
        id: 'q5',
        text: 'Trong số những hành vi sau đây, hành vi nào không phải hành vi tham nhũng?',
        choices: [
            { id: 'a', text: 'Giả mạo trong công tác vì vụ lợi' },
            { id: 'b', text: 'Công chức lừa đảo chiếm đoạt tài sản' },
            { id: 'c', text: 'Công chức nhũng nhiễu vì vụ lợi' },
            { id: 'd', text: 'Lợi dụng chức vụ, quyền hạn sử dụng trái phép tài sản công vì vụ lợi' }
        ],
        correctId: 'b',
        explanation: 'Hành vi "Công chức lừa đảo chiếm đoạt tài sản" không được liệt kê trong danh sách 12 hành vi tham nhũng quy định tại Điều 2 Luật Phòng, chống tham nhũng 2018. Đây là hành vi vi phạm pháp luật hình sự (có thể cấu thành tội "Lừa đảo chiếm đoạt tài sản" theo Bộ luật Hình sự) nhưng bản thân nó không được định nghĩa là một hành vi tham nhũng.'
    },
    {
        id: 'q6',
        text: 'Hành vi nhận tiền, sửa điểm thi là hành vi nào trong số các hành vi sau đây?',
        choices: [
            { id: 'a', text: 'Gian lận trong thi cử' },
            { id: 'b', text: 'Nhận hối lộ' },
            { id: 'c', text: 'Tiêu cực' },
            { id: 'd', text: 'Lợi dụng chức vụ, quyền hạn trong khi thi hành nhiệm vụ, công vụ vì vụ lợi' }
        ],
        correctId: 'b',
        explanation: 'Hành vi nhận tiền để sửa điểm thi được quy định rõ ràng là hành vi nhận hối lộ tại Điểm b, Khoản 2, Điều 3 của Luật Phòng, chống tham nhũng 2018. Theo đó, "Nhận hối lộ" là việc người có chức vụ, quyền hạn trực tiếp hoặc qua trung gian nhận hoặc sẽ nhận bất kỳ lợi ích nào cho bản thân hoặc cho người hoặc tổ chức khác để làm hoặc không làm một việc vì vụ lợi. Việc sửa điểm là hành động "làm một việc" do nhận tiền, nên thỏa mãn đầy đủ các dấu hiệu của tội nhận hối lộ. '
    },
    {
        id: 'q7',
        text: 'Hành vi nhận hối lộ được quy định như thế nào trong Luật Phòng, chống tham nhũng?',
        choices: [
            { id: "a", text: 'Là việc nhận hoặc sẽ nhận bất kỳ lợi ích nào để làm hoặc không làm một việc vì vụ lợi' },
            { id: "b", text: 'Là việc nhận tiền lương từ ngân sách nhà nước' },
            { id: "c", text: 'Là việc nhận quà biếu theo phong tục tập quán' },
            { id: "d", text: 'Là việc nhận thưởng từ kết quả công việc' }
        ],
        correctId: 'a',
        explanation: "Theo Điểm b Khoản 2 Điều 3 Luật Phòng, chống tham nhũng 2018, nhận hối lộ là việc người có chức vụ, quyền hạn trực tiếp hoặc qua trung gian nhận hoặc sẽ nhận bất kỳ lợi ích nào cho bản thân hoặc cho người hoặc tổ chức khác để làm hoặc không làm một việc vì vụ lợi."
    },
    {
        id: 'q8',
        text: "Trách nhiệm của người đứng đầu cơ quan, tổ chức, đơn vị trong phòng, chống tham nhũng bao gồm:",
        choices: [
            { id: "a", text: "Chỉ chịu trách nhiệm về hành vi tham nhũng của bản thân mình" },
            { id: "b", text: "Phải chịu trách nhiệm khi để xảy ra tham nhũng trong cơ quan, tổ chức, đơn vị do mình đứng đầu" },
            { id: "c", text: "Chỉ phải chịu trách nhiệm khi trực tiếp tham gia vào hành vi tham nhũng" },
            { id: "d", text: "Không phải chịu trách nhiệm về hành vi tham nhũng của cấp dưới" }
        ],
        correctId: "b",
        explanation: "Theo Điều 4 Luật Phòng, chống tham nhũng 2018, người đứng đầu cơ quan, tổ chức, đơn vị phải chịu trách nhiệm khi để xảy ra tham nhũng trong cơ quan, tổ chức, đơn vị do mình đứng đầu. Đây là nguyên tắc quan trọng trong công tác phòng, chống tham nhũng."
    },
    {
        id: 'q9',
        text: 'Theo Luật Phòng, chống tham nhũng, hành vi "lợi dụng chức vụ, quyền hạn sử dụng trái phép tài sản công vì vụ lợi" được phân loại là:',
        choices: [
            { id: 'a', text: 'Hành vi tham ô tài sản' },
            { id: 'b', text: 'Hành vi nhận hối lộ' },
            { id: 'c', text: 'Hành vi tham nhũng khác' },
            { id: 'd', text: 'Hành vi tiêu cực' }
        ],
        correctId: 'c',
        explanation: 'Theo Điểm i Khoản 1 Điều 3 Luật Phòng, chống tham nhũng 2018, hành vi "lợi dụng chức vụ, quyền hạn sử dụng trái phép tài sản công vì vụ lợi" được quy định là một trong những hành vi tham nhũng khác không thuộc các trường hợp tham ô, nhận hối lộ.'
    },
    {
        id: 'q10',
        text: 'Theo quy định của pháp luật, việc kê khai tài sản, thu nhập áp dụng đối với những đối tượng nào?',
        choices: [
            { id: 'a', text: 'Chỉ áp dụng đối với cán bộ, công chức, viên chức' },
            { id: 'b', text: 'Chỉ áp dụng đối với người giữ chức vụ lãnh đạo, quản lý' },
            { id: 'c', text: 'Áp dụng đối với người có chức vụ, quyền hạn theo quy định của Luật Phòng, chống tham nhũng' },
            { id: 'd', text: 'Chỉ áp dụng đối với người làm việc trong các cơ quan nhà nước' }
        ],
        correctId: 'c',
        explanation: 'Theo Điều 45 Luật Phòng, chống tham nhũng 2018, việc kê khai tài sản, thu nhập áp dụng đối với người có chức vụ, quyền hạn theo quy định của Luật này, bao gồm cả người trong khu vực nhà nước và khu vực ngoài nhà nước.'
    },
    {
        id: 'q11',
        text: 'Hành vi "nhũng nhiễu vì vụ lợi" được hiểu là:',
        choices: [
            { id: 'a', text: 'Gây khó khăn, phiền hà cho công dân để trục lợi' },
            { id: 'b', text: 'Làm việc chậm trễ so với quy định' },
            { id: 'c', text: 'Không giải quyết công việc đúng hạn' },
            { id: 'd', text: 'Tất cả các đáp án trên' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 3 Luật Phòng, chống tham nhũng, nhũng nhiễu vì vụ lợi bao gồm các hành vi gây khó khăn, phiền hà, chậm trễ trong giải quyết công việc để trục lợi.'
    },
    {
        id: 'q12',
        text: 'Cơ quan nào chịu trách nhiệm tổ chức thực hiện công tác phòng, chống tham nhũng?',
        choices: [
            { id: 'a', text: 'Chính phủ' },
            { id: 'b', text: 'Thanh tra Chính phủ' },
            { id: 'c', text: 'Bộ Công an' },
            { id: 'd', text: 'Tất cả các cơ quan trên' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 5 Luật Phòng, chống tham nhũng, các cơ quan này đều có trách nhiệm trong công tác phòng, chống tham nhũng theo thẩm quyền.'
    },
    {
        id: 'q13',
        text: 'Thời hiệu xử lý kỷ luật đối với hành vi tham nhũng là bao lâu?',
        choices: [
            { id: 'a', text: '02 năm' },
            { id: 'b', text: '03 năm' },
            { id: 'c', text: '05 năm' },
            { id: 'd', text: 'Không có thời hiệu' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 85 Luật Phòng, chống tham nhũng, hành vi tham nhũng không có thời hiệu xử lý kỷ luật.'
    },
    {
        id: 'q14',
        text: 'Hành vi "môi giới hối lộ" được xử lý như thế nào?',
        choices: [
            { id: 'a', text: 'Chỉ xử lý hình sự' },
            { id: 'b', text: 'Chỉ xử lý hành chính' },
            { id: 'c', text: 'Xử lý hình sự hoặc hành chính tùy mức độ' },
            { id: 'd', text: 'Chỉ khiển trách' }
        ],
        correctId: 'c',
        explanation: 'Theo Điều 2 và Điều 84 Luật Phòng, chống tham nhũng, hành vi môi giới hối lộ có thể bị xử lý hình sự hoặc xử lý kỷ luật tùy theo tính chất, mức độ.'
    },
    {
        id: 'q15',
        text: 'Hành vi "thổi giá" trong mua sắm công được xếp vào loại nào?',
        choices: [
            { id: 'a', text: 'Tham ô tài sản' },
            { id: 'b', text: 'Lợi dụng chức vụ, quyền hạn' },
            { id: 'c', text: 'Giả mạo trong công tác' },
            { id: 'd', text: 'Nhận hối lộ' }
        ],
        correctId: 'b',
        explanation: 'Hành vi thổi giá trong mua sắm công được xếp vào nhóm lợi dụng chức vụ, quyền hạn để trục lợi theo Điều 2 Luật Phòng, chống tham nhũng.'
    },
    {
        id: 'q16',
        text: 'Hành vi "rửa tiền" có mối quan hệ như thế nào với tham nhũng?',
        choices: [
            { id: 'a', text: 'Là một dạng của tham nhũng' },
            { id: 'b', text: 'Là hành vi độc lập với tham nhũng' },
            { id: 'c', text: 'Là hậu quả của tham nhũng' },
            { id: 'd', text: 'Không có quan hệ' }
        ],
        correctId: 'c',
        explanation: 'Rửa tiền thường là hành vi tiếp theo nhằm hợp pháp hóa các khoản tiền, tài sản có được từ tham nhũng, do đó có mối quan hệ nhân quả với tham nhũng.'
    },
    {
        id: 'q17',
        text: 'Hành vi "bao che" cho người có hành vi tham nhũng bị xử lý như thế nào?',
        choices: [
            { id: 'a', text: 'Nhẹ hơn người trực tiếp tham nhũng' },
            { id: 'b', text: 'Như người trực tiếp tham nhũng' },
            { id: 'c', text: 'Nặng hơn người trực tiếp tham nhũng' },
            { id: 'd', text: 'Chỉ cảnh cáo' }
        ],
        correctId: 'b',
        explanation: 'Theo Điều 84 Luật Phòng, chống tham nhũng, hành vi bao che cho người tham nhũng bị xử lý kỷ luật như đối với hành vi tham nhũng.'
    },
    {
        id: 'q18',
        text: 'Người phát hiện tham nhũng có nghĩa vụ:',
        choices: [
            { id: 'a', text: 'Cung cấp thông tin trung thực' },
            { id: 'b', text: 'Chịu trách nhiệm về nội dung tố giác' },
            { id: 'c', text: 'Hợp tác với cơ quan chức năng' },
            { id: 'd', text: 'Tất cả các nghĩa vụ trên' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 13 Luật Phòng, chống tham nhũng, người phát hiện tham nhũng có nghĩa vụ cung cấp thông tin trung thực, chịu trách nhiệm và hợp tác với cơ quan chức năng.'
    },
    {
        id: 'q19',
        text: '“Máu nào cũng là máu, người nào cũng là người” thể hiện tư tưởng gì?',
        choices: [
            { id: 'a', text: 'Tình thương yêu con người' },
            { id: 'b', text: 'Chủ nghĩa dân tộc' },
            { id: 'c', text: 'Tinh thần đấu tranh giai cấp' },
            { id: 'd', text: 'Ý chí kiên cường' },
        ],
        correctId: 'a',
        explanation: 'Khẳng định sự bình đẳng, nhân đạo, không phân biệt.'
    },
    {
        id: 'q20',
        text: 'Hành vi "lợi dụng chức vụ để trục lợi" khác với "tham ô" ở điểm nào?',
        choices: [
            { id: 'a', text: 'Không chiếm đoạt tài sản' },
            { id: 'b', text: 'Không trực tiếp nhận hối lộ' },
            { id: 'c', text: 'Sử dụng ảnh hưởng để có lợi ích' },
            { id: 'd', text: 'Tất cả các điểm trên' }
        ],
        correctId: 'c',
        explanation: 'Hành vi lợi dụng chức vụ để trục lợi chủ yếu là sử dụng ảnh hưởng, uy tín của chức vụ để tạo lợi ích, khác với tham ô là chiếm đoạt trực tiếp tài sản.'
    },
    {
        id: 'q21',
        text: 'Việc giám sát của cộng đồng trong phòng, chống tham nhũng được thực hiện thông qua:',
        choices: [
            { id: 'a', text: 'Tiếp nhận phản ánh, tố giác' },
            { id: 'b', text: 'Công khai thông tin' },
            { id: 'c', text: 'Lấy ý kiến nhân dân' },
            { id: 'd', text: 'Tất cả các hình thức trên' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 9 Luật Phòng, chống tham nhũng, giám sát của cộng đồng được thực hiện thông qua nhiều hình thức khác nhau.'
    },
    {
        id: 'q22',
        text: 'Hành vi "ép buộc" trong giải quyết công việc được xem là:',
        choices: [
            { id: 'a', text: 'Nhũng nhiễu' },
            { id: 'b', text: 'Lạm quyền' },
            { id: 'c', text: 'Cả hai hành vi a và b' },
            { id: 'd', text: 'Không phải tham nhũng' }
        ],
        correctId: 'c',
        explanation: 'Hành vi ép buộc trong giải quyết công việc có dấu hiệu của cả nhũng nhiễu và lạm quyền theo quy định của pháp luật.'
    },
    {
        id: 'q23',
        text: 'Hành vi "thất thoát" tài sản công do thiếu trách nhiệm được xử lý như thế nào?',
        choices: [
            { id: 'a', text: 'Chỉ bồi thường vật chất' },
            { id: 'b', text: 'Chỉ xử lý kỷ luật' },
            { id: 'c', text: 'Xử lý cả kỷ luật và bồi thường' },
            { id: 'd', text: 'Chỉ cảnh cáo' }
        ],
        correctId: 'c',
        explanation: 'Theo quy định pháp luật, hành vi gây thất thoát tài sản công do thiếu trách nhiệm phải chịu cả xử lý kỷ luật và bồi thường thiệt hại.'
    },
    {
        id: 'q24',
        text: 'Người đứng đầu phải chịu trách nhiệm khi để xảy ra tham nhũng trong trường hợp nào?',
        choices: [
            { id: 'a', text: 'Không tổ chức kiểm tra, giám sát' },
            { id: 'b', text: 'Không xử lý kịp thời vi phạm' },
            { id: 'c', text: 'Bao che cho cấp dưới' },
            { id: 'd', text: 'Tất cả các trường hợp trên' }
        ],
        correctId: 'd',
        explanation: 'Theo Điều 6 Luật Phòng, chống tham nhũng, người đứng đầu phải chịu trách nhiệm trong tất cả các trường hợp trên.'
    },
    {
        id: 'q25',
        text: 'Nguyên tắc cơ bản trong phòng, chống tham nhũng là gì?',
        choices: [
            { id: 'a', text: 'Công khai, minh bạch, kịp thời' },
            { id: 'b', text: 'Giữ bí mật tuyệt đối' },
            { id: 'c', text: 'Chỉ xử lý khi có đơn tố cáo' },
            { id: 'd', text: 'Dựa vào ý kiến lãnh đạo' }
        ],
        correctId: 'a',
        explanation: 'Luật Phòng, chống tham nhũng quy định nguyên tắc phải công khai, minh bạch, kịp thời trong hoạt động của cơ quan, tổ chức để phòng ngừa tham nhũng.'
    },
    {
        id: 'q26',
        text: 'Tham nhũng gây ra hậu quả gì cho xã hội?',
        choices: [
            { id: 'a', text: 'Thúc đẩy tăng trưởng kinh tế' },
            { id: 'b', text: 'Mất niềm tin của nhân dân, suy giảm kinh tế' },
            { id: 'c', text: 'Tăng cường hiệu quả quản lý' },
            { id: 'd', text: 'Không ảnh hưởng gì lớn' }
        ],
        correctId: 'b',
        explanation: 'Tham nhũng làm suy thoái kinh tế, phá hoại sự công bằng xã hội và làm mất niềm tin của nhân dân vào nhà nước.'
    },
    {
        id: 'q27',
        text: 'Luật Phòng, chống tham nhũng 2018 quy định đối tượng nào phải kê khai tài sản, thu nhập?',
        choices: [
            { id: 'a', text: 'Mọi công dân' },
            { id: 'b', text: 'Người có chức vụ, quyền hạn trong cơ quan, tổ chức, đơn vị' },
            { id: 'c', text: 'Chỉ doanh nhân' },
            { id: 'd', text: 'Chỉ công an và bộ đội' }
        ],
        correctId: 'b',
        explanation: 'Đối tượng phải kê khai tài sản, thu nhập là người có chức vụ, quyền hạn trong cơ quan, tổ chức, đơn vị theo quy định của Luật.'
    },
    {
        id: 'q28',
        text: 'Luật Phòng, chống tham nhũng năm 2018 có hiệu lực từ ngày nào?',
        choices: [
            { id: 'a', text: '01/01/2018' },
            { id: 'b', text: '01/07/2018' },
            { id: 'c', text: '01/01/2019' },
            { id: 'd', text: '01/07/2019' }
        ],
        correctId: 'c',
        explanation: 'Luật Phòng, chống tham nhũng 2018 được Quốc hội thông qua và có hiệu lực từ ngày 01/01/2019.'
    },
    {
        id: 'q29',
        text: 'Câu nói “Tham nhũng là kẻ thù của sự phát triển” phản ánh điều gì?',
        choices: [
            { id: 'a', text: 'Tham nhũng thúc đẩy đổi mới' },
            { id: 'b', text: 'Tham nhũng làm cản trở sự phát triển kinh tế - xã hội' },
            { id: 'c', text: 'Tham nhũng không ảnh hưởng' },
            { id: 'd', text: 'Tham nhũng chỉ ảnh hưởng trong chính trị' }
        ],
        correctId: 'b',
        explanation: 'Tham nhũng làm thất thoát nguồn lực, kìm hãm sự phát triển bền vững của xã hội.'
    },
    {
        id: 'q30',
        text: 'Theo Tổng Bí thư Nguyễn Phú Trọng, chống tham nhũng là nhiệm vụ gì?',
        choices: [
            { id: 'a', text: 'Nhiệm vụ thường xuyên, lâu dài' },
            { id: 'b', text: 'Chiến dịch ngắn hạn' },
            { id: 'c', text: 'Công việc của riêng Đảng' },
            { id: 'd', text: 'Không cần thiết nếu kinh tế phát triển' }
        ],
        correctId: 'a',
        explanation: 'Ông nhấn mạnh chống tham nhũng là nhiệm vụ vừa cấp bách, vừa thường xuyên, lâu dài.'
    },
    {
        id: 'q31',
        text: 'Nguyễn Phú Trọng thường nhấn mạnh chống tham nhũng gắn với công tác gì?',
        choices: [
            { id: 'a', text: 'Đổi mới giáo dục' },
            { id: 'b', text: 'Chỉnh đốn Đảng' },
            { id: 'c', text: 'Mở rộng kinh tế thị trường' },
            { id: 'd', text: 'Phát triển khoa học công nghệ' }
        ],
        correctId: 'b',
        explanation: 'Ông luôn đặt trọng tâm chống tham nhũng đi đôi với xây dựng, chỉnh đốn Đảng.'
    },
    {
        id: 'q32',
        text: 'Tại sao tham nhũng được gọi là “giặc nội xâm”?',
        choices: [
            { id: 'a', text: 'Vì nó phá hoại đất nước từ bên trong' },
            { id: 'b', text: 'Vì liên quan đến nước ngoài' },
            { id: 'c', text: 'Vì xảy ra trong quân đội' },
            { id: 'd', text: 'Vì chỉ ảnh hưởng đến an ninh' }
        ],
        correctId: 'a',
        explanation: 'Tham nhũng làm suy yếu đất nước từ bên trong, nên gọi là “giặc nội xâm”.'
    },
    {
        id: 'q33',
        text: 'Vì sao phải mở rộng hoạt động PCTN ra khu vực ngoài nhà nước?',
        choices: [
            { id: 'a', text: 'Vì chỉ có tham nhũng ở ngoài nhà nước' },
            { id: 'b', text: 'Vì khu vực ngoài nhà nước không liên quan' },
            { id: 'c', text: 'Vì có sự cấu kết giữa cán bộ thoái hóa trong nhà nước và đối tượng ngoài nhà nước' },
            { id: 'd', text: 'Vì luật yêu cầu' }
        ],
        correctId: 'c',
        explanation: 'Tham nhũng, tiêu cực thường có sự cấu kết giữa cán bộ thoái hóa trong khu vực công và đối tượng ngoài nhà nước.'
    },
    {
        id: 'q34',
        text: 'Công ước quốc tế nào Việt Nam tham gia nhằm tăng hiệu quả hợp tác chống tham nhũng?',
        choices: [
            { id: 'a', text: 'Công ước Liên hợp quốc về chống tham nhũng' },
            { id: 'b', text: 'Hiệp định Paris' },
            { id: 'c', text: 'Công ước chống tội phạm mạng' },
            { id: 'd', text: 'Hiệp định thương mại tự do' }
        ],
        correctId: 'a',
        explanation: 'Việt Nam đã nội luật hóa và thực thi Công ước Liên hợp quốc về chống tham nhũng theo lộ trình phù hợp.'
    },
    {
        id: 'q35',
        text: 'Vì sao công tác phòng chống tham nhũng, tiêu cực được coi là “công việc khó, phức tạp, nhạy cảm”?',
        choices: [
            { id: 'a', text: 'Vì đụng chạm đến lợi ích của nhiều người, nhiều nhóm' },
            { id: 'b', text: 'Vì chỉ liên quan kinh tế' },
            { id: 'c', text: 'Vì không có ai tham gia' },
            { id: 'd', text: 'Vì chỉ cần tuyên truyền' }
        ],
        correctId: 'a',
        explanation: 'PCTN tác động trực tiếp đến lợi ích của nhiều nhóm, dễ gây chống đối, nên rất khó và nhạy cảm.'
    },
    {
        id: 'q36',
        text: 'Hành vi nào dưới đây được coi là tham nhũng trong nhà trường?',
        choices: [
            { id: 'a', text: 'Giáo viên nhận tiền để nâng điểm cho sinh viên' },
            { id: 'b', text: 'Sinh viên giúp bạn chép bài' },
            { id: 'c', text: 'Giảng viên nhiệt tình hướng dẫn khóa luận' },
            { id: 'd', text: 'Sinh viên tham gia tình nguyện' }
        ],
        correctId: 'a',
        explanation: 'Nhận tiền để nâng điểm là hành vi tham nhũng rõ ràng, vi phạm đạo đức và pháp luật.'
    },
    {
        id: 'q37',
        text: 'Sinh viên phát hiện cán bộ thu thêm khoản phí ngoài quy định. Việc cần làm là gì?',
        choices: [
            { id: 'a', text: 'Im lặng vì sợ bị trù dập' },
            { id: 'b', text: 'Tố cáo hành vi đó theo đúng quy định' },
            { id: 'c', text: 'Chia sẻ lên mạng xã hội' },
            { id: 'd', text: 'Đưa thêm tiền để được việc nhanh hơn' }
        ],
        correctId: 'b',
        explanation: 'Sinh viên cần tố cáo hành vi tham nhũng để bảo vệ quyền lợi hợp pháp của mình và tập thể.'
    },
    {
        id: 'q38',
        text: 'Xây dựng văn hóa liêm chính học đường nhằm mục tiêu gì?',
        choices: [
            { id: 'a', text: 'Nâng cao ý thức trung thực, trách nhiệm cho thầy và trò' },
            { id: 'b', text: 'Giúp sinh viên đạt điểm cao hơn' },
            { id: 'c', text: 'Giảm áp lực học tập' },
            { id: 'd', text: 'Tạo điều kiện khen thưởng nhiều hơn' }
        ],
        correctId: 'a',
        explanation: 'Văn hóa liêm chính học đường giúp hình thành thái độ sống trung thực, công bằng và trách nhiệm.'
    },
    {
        id: 'q39',
        text: 'Cán bộ thu học phí phải làm gì để tránh tiêu cực?',
        choices: [
            { id: 'a', text: 'Công khai, minh bạch quy trình thu chi' },
            { id: 'b', text: 'Giữ bí mật số tiền thu' },
            { id: 'c', text: 'Chỉ báo cáo miệng cho lãnh đạo' },
            { id: 'd', text: 'Tự quyết định mức thu' }
        ],
        correctId: 'a',
        explanation: 'Minh bạch trong thu chi là biện pháp quan trọng để tránh tiêu cực, tham nhũng.'
    },
    {
        id: 'q40',
        text: 'Công khai, minh bạch trong nhà trường cần áp dụng ở lĩnh vực nào?',
        choices: [
            { id: 'a', text: 'Thu chi tài chính' },
            { id: 'b', text: 'Tuyển dụng cán bộ' },
            { id: 'c', text: 'Thi cử, đánh giá kết quả học tập' },
            { id: 'd', text: 'Tất cả các lĩnh vực trên' }
        ],
        correctId: 'd',
        explanation: 'Công khai, minh bạch cần được áp dụng trong mọi hoạt động của nhà trường.'
    },
    {
        id: 'q41',
        text: 'Hậu quả nghiêm trọng nhất của tham nhũng trong giáo dục là:',
        choices: [
            { id: 'a', text: 'Làm suy thoái chất lượng đào tạo và mất niềm tin xã hội' },
            { id: 'b', text: 'Làm tăng chi phí học tập' },
            { id: 'c', text: 'Giảm số lượng sinh viên' },
            { id: 'd', text: 'Tạo ra sự cạnh tranh lành mạnh' }
        ],
        correctId: 'a',
        explanation: 'Tham nhũng trong giáo dục làm suy thoái chất lượng đào tạo và niềm tin xã hội.'
    },
    {
        id: 'q42',
        text: 'Theo tài liệu, xây dựng môi trường liêm chính học đường cần sự tham gia của ai?',
        choices: [
            { id: 'a', text: 'Chỉ giảng viên' },
            { id: 'b', text: 'Chỉ sinh viên' },
            { id: 'c', text: 'Cả giảng viên, sinh viên và cán bộ quản lý' },
            { id: 'd', text: 'Chỉ lãnh đạo nhà trường' }
        ],
        correctId: 'c',
        explanation: 'Xây dựng liêm chính học đường là trách nhiệm của toàn bộ thành viên trong trường.'
    },
    {
        id: 'q43',
        text: 'Một trong những hạn chế trong phòng chống tham nhũng hiện nay là gì?',
        choices: [
            { id: 'a', text: 'Chưa có quy định pháp luật' },
            { id: 'b', text: 'Tự kiểm tra, tự phát hiện còn là khâu yếu' },
            { id: 'c', text: 'Bộ máy quá nhỏ' },
            { id: 'd', text: 'Không có nhân dân tham gia' }
        ],
        correctId: 'b',
        explanation: 'Việc tự kiểm tra, tự phát hiện và xử lý trong nội bộ còn là khâu yếu trong PCTN.'
    },
    {
        id: 'q44',
        text: 'Một cán bộ bao che sai phạm của đồng nghiệp để giữ “hòa khí” được coi là:',
        choices: [
            { id: 'a', text: 'Hành vi tiêu cực, dung túng tham nhũng' },
            { id: 'b', text: 'Giữ đoàn kết nội bộ' },
            { id: 'c', text: 'Cách quản lý mềm dẻo' },
            { id: 'd', text: 'Không liên quan' }
        ],
        correctId: 'a',
        explanation: 'Bao che sai phạm là hành vi tiêu cực, dung túng cho tham nhũng phát triển.'
    },
    {
        id: 'q45',
        text: 'Một biểu hiện của “tham nhũng vặt” là gì?',
        choices: [
            { id: 'a', text: 'Không tồn tại' },
            { id: 'b', text: 'Tham ô lớn trong ngân sách' },
            { id: 'c', text: 'Chỉ cấp cao mới có' },
            { id: 'd', text: 'Nhũng nhiễu, vòi vĩnh trong giải quyết thủ tục hành chính' }
        ],
        correctId: 'd',
        explanation: '“Tham nhũng vặt” là những hành vi nhũng nhiễu, vòi vĩnh hàng ngày.'
    },
    {
        id: 'q46',
        text: 'Cần chú trọng xây dựng đội ngũ cán bộ như thế nào?',
        choices: [
            { id: 'a', text: 'Có bản lĩnh, đạo đức, năng lực, liêm chính' },
            { id: 'b', text: 'Giỏi quan hệ' },
            { id: 'c', text: 'Chỉ cần nhiều bằng cấp' },
            { id: 'd', text: 'Không quan trọng' }
        ],
        correctId: 'a',
        explanation: 'Đội ngũ cán bộ phải có bản lĩnh, đạo đức, năng lực và liêm chính để PCTN hiệu quả.'
    },
]

const QuizSystem: React.FC = () => {
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro')
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 phút = 1200 giây
    const [, setTimer] = useState<number | null>(null);

    const selectRandomQuestions = useCallback(() => {
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 20)
    }, [])

    // Tính điểm
    const score = useMemo(() => {
        return questions.reduce((acc, q) => acc + (answers[q.id] === q.correctId ? 1 : 0), 0)
    }, [answers, questions])

    // Timer
    useEffect(() => {
        let interval: number | null = null

        if (phase === 'quiz' && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleSubmit()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) window.clearInterval(interval)
        }
    }, [phase, timeLeft])

    // Auto save answers to prevent loss
    useEffect(() => {
        if (phase === 'quiz' && Object.keys(answers).length > 0) {
            const autoSave = setTimeout(() => {
                // Auto-save logic could be implemented here
            }, 2000)
            return () => clearTimeout(autoSave)
        }
    }, [answers, phase])

    // Xử lý thoát trang/tab
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (phase === 'quiz' && document.hidden) {
                handleReset()
            }
        }

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (phase === 'quiz') {
                e.preventDefault()
                return 'Bạn có chắc muốn thoát? Tiến trình làm bài sẽ mất.'
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [phase])

    const handleStart = () => {
        const selectedQuestions = selectRandomQuestions()
        setQuestions(selectedQuestions)
        setAnswers({})
        setCurrentIndex(0)
        setTimeLeft(20 * 60)
        setPhase('quiz')
    }

    const handleAnswer = (questionId: string, choiceId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: choiceId }))
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const handleSubmit = () => {
        setPhase('result')
    }

    const handleReset = () => {
        setPhase('intro')
        setQuestions([])
        setAnswers({})
        setCurrentIndex(0)
        setTimeLeft(20 * 60)
        setTimer(null);
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getAnsweredCount = () => {
        return Object.keys(answers).length
    }
    const getQuestionStatus = (index: number) => {
        const question = questions[index]
        if (!question) return 'unanswered'

        if (answers[question.id]) return 'answered'
        if (index === currentIndex) return 'current'
        return 'unanswered'
    }

    // Trang giới thiệu
    if (phase === 'intro') {
        return (
            <div className="quiz-container">
                <div className="intro-card">
                    <h1 className="intro-title">TRẮC NGHIỆM PHÒNG CHỐNG THAM NHŨNG, TIÊU CỰC</h1>

                    <div className="intro-rules">
                        <h2>📋 Quy định</h2>
                        <ul>
                            <li><strong>Thời gian:</strong> 20 phút</li>
                            <li><strong>Số câu:</strong> 20 câu</li>
                            <li><strong>Lưu ý:</strong> Không được thoát trang trong khi làm bài</li>
                        </ul>
                    </div>

                    <div className="intro-actions">
                        <button className="start-btn" onClick={handleStart}>
                            BẮT ĐẦU
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Trang làm bài
    if (phase === 'quiz') {
        const currentQuestion = questions[currentIndex]

        return (
            <div className="quiz-container">
                <div className="quiz-layout">
                    <div className="quiz-main">
                        <div className="quiz-header">
                            <h1>Câu {currentIndex + 1}/{questions.length}</h1>
                        </div>

                        <div className="question-card">
                            <div className="question-text">{currentQuestion.text}</div>
                        </div>

                        <div className="choices-container">
                            {currentQuestion.choices.map((choice) => {
                                const isSelected = answers[currentQuestion.id] === choice.id
                                return (
                                    <button
                                        key={choice.id}
                                        className={`choice-btn ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(currentQuestion.id, choice.id)}
                                    >
                                        <span className="choice-bullet">
                                            {choice.id.toUpperCase()}.
                                        </span>
                                        <span className="choice-text">{choice.text}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="navigation-buttons">
                            <button
                                className="nav-btn prev-btn"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                            >
                                ← Trước
                            </button>

                            {currentIndex < questions.length - 1 ? (
                                <button className="nav-btn next-btn" onClick={handleNext}>
                                    Sau →
                                </button>
                            ) : (
                                <button className="submit-btn" onClick={handleSubmit}>
                                    NỘP BÀI
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="quiz-sidebar">
                        <div className={`timer ${timeLeft < 300 ? 'warning' : ''}`}>
                            <div className="timer-text">{formatTime(timeLeft)}</div>
                        </div>

                        <div className="question-grid">
                            <div className="grid-container">
                                {questions.map((_, index) => {
                                    const status = getQuestionStatus(index)
                                    return (
                                        <button
                                            key={index}
                                            className={`grid-item ${status}`}
                                            onClick={() => setCurrentIndex(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="progress-info">
                            Đã làm: {getAnsweredCount()}/{questions.length}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Trang kết quả
    if (phase === 'result') {
        const percentage = Math.round((score / questions.length) * 100)
        const getGrade = (percent: number) => {
            if (percent >= 90) return { grade: 'Yêu nước', color: '#4caf50', emoji: '💕' }
            if (percent >= 80) return { grade: 'Yêu nước', color: '#8bc34a', emoji: '💕' }
            if (percent >= 70) return { grade: 'Còn liêm', color: '#ffc107', emoji: '👍' }
            if (percent >= 50) return { grade: 'Tham nhũng con', color: '#ff9800', emoji: '😒' }
            return { grade: 'Tham nhũng chúa', color: '#f44336', emoji: '💀' }
        }

        const gradeInfo = getGrade(percentage)

        return (
            <div className="quiz-container">
                <div className="result-card">
                    <div className="result-header">
                        <h1>KẾT QUẢ</h1>

                        <div className="score-display" style={{ backgroundColor: gradeInfo.color }}>
                            <div className="score-emoji">{gradeInfo.emoji}</div>
                            <div className="score-value">{score}/{questions.length} ({percentage}%)</div>
                            <div className="score-grade">{gradeInfo.grade}</div>
                        </div>
                    </div>

                    <div className="result-details">
                        <h2>Chi tiết</h2>

                        {questions.map((question, index) => {
                            const userAnswer = answers[question.id]
                            const isCorrect = userAnswer === question.correctId
                            const correctChoice = question.choices.find(c => c.id === question.correctId)
                            const userChoice = question.choices.find(c => c.id === userAnswer)

                            return (
                                <div key={question.id} className={`answer-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-header">
                                        <span className="question-index">Câu {index + 1}</span>
                                        <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                                            {isCorrect ? '✓' : '✗'}
                                        </span>
                                    </div>

                                    <div className="review-question">{question.text}</div>

                                    <div className="review-answers">
                                        <div className="answer-row">
                                            <strong>Bạn chọn:</strong> {userChoice?.text || 'Chưa trả lời'}
                                        </div>
                                        <div className="answer-row correct-answer">
                                            <strong>Đáp án:</strong> {correctChoice?.text}
                                        </div>
                                    </div>

                                    {question.explanation && (
                                        <div className="explanation">
                                            {question.explanation}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="result-actions">
                        <button className="action-btn retry-btn" onClick={handleReset}>
                            LÀM LẠI
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default QuizSystem
