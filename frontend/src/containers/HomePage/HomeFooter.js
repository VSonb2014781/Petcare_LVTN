import React, { Component } from "react";
import { connect } from "react-redux";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, GlobalOutlined } from "@ant-design/icons";

class HomeFooter extends Component {
  render() {
    const boldIconStyle = { fontWeight: "bold", fontSize: "16px", color: "#00695c" };
    const textStyle = { fontSize: "16px", color: "#333" }; // Định nghĩa kiểu chữ cho các đoạn văn

    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <div className="wrapper-footer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#f8f8f8' }}>
              {/* Thông tin hệ thống bệnh viện */}
              <div style={{ flex: 1, margin: '0 10px' }}>
                <h5 style={{ color: "#00695c", fontSize: "16px" }}><strong>HỆ THỐNG BỆNH VIỆN THÚ Y DOGS & CAT VIỆT NAM</strong></h5>
                <p style={textStyle}>Giấy đăng kí kinh doanh số: <strong>4001205670</strong> do Chi cục Thuế khu vực Tam Kỳ - Phú Ninh cấp ngày <strong>17/04/2020</strong></p>
                <h6 style={{ color: "#00695c", fontSize: "16px" }}><strong>TAM KỲ:</strong></h6>
                <p style={textStyle}>
                  <EnvironmentOutlined style={boldIconStyle} /> Cơ sở 1: Số 31 Tôn Đức Thắng, An Sơn, Tam Kỳ, Quảng Nam
                </p>
                <p style={textStyle}>
                  <PhoneOutlined style={boldIconStyle} /> Điện thoại: 0941.579.007 / 0393.434.115
                </p>
                <p style={textStyle}>
                  <MailOutlined style={boldIconStyle} /> Email: benhvienthucungvn@gmail.com
                </p>
                <p style={textStyle}>
                  <GlobalOutlined style={boldIconStyle} /> Website: <a href="https://bacsithucung.vn"><strong>https://bacsithucung.vn</strong></a>
                </p>
                <p style={textStyle}><strong>Dr. Sơn</strong> – CEO Hệ Thống Bệnh Viện | LH: 0988.817.861</p>
                <p style={textStyle}><strong>Mrs. Trân</strong> – Quản Lý Mảng Grooming & Spa – LH: 0389.378.308</p>
              </div>

              {/* Dịch vụ và giờ mở cửa */}
              <div style={{ flex: 1, margin: '0 10px' }}>
                <h6 style={{ color: "#00695c", fontSize: "16px" }}><strong>DỊCH VỤ CHÍNH</strong></h6>
                <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
                  <li>Khám sức khỏe cho thú cưng</li>
                  <li>Tiêm phòng cho thú cưng</li>
                  <li>Grooming & Spa</li>
                  <li>Phẫu thuật thú y</li>
                  <li>Khám bệnh nội khoa</li>
                </ul>
                <h6 style={{ color: "#00695c", fontSize: "16px" }}><strong>GIỜ MỞ CỬA</strong></h6>
                <p style={textStyle}>Thứ 2 - Thứ 6: 8:00 AM - 6:00 PM</p>
                <p style={textStyle}>Thứ 7: 8:00 AM - 4:00 PM</p>
                <p style={textStyle}>Chủ nhật: Nghỉ</p>
              </div>

              {/* Câu hỏi thường gặp */}
              <div style={{ flex: 1, margin: '0 10px' }}>
                <h6 style={{ color: "#00695c", fontSize: "16px" }}><strong>CÂU HỎI THƯỜNG GẶP (FAQ)</strong></h6>
                <p style={textStyle}><strong>1. Làm thế nào để đặt lịch hẹn?</strong> Bạn có thể gọi điện hoặc truy cập website để đặt lịch.</p>
                <p style={textStyle}><strong>2. Có cần phải tiêm phòng trước khi đến không?</strong> Có, hãy đảm bảo thú cưng của bạn đã được tiêm phòng đầy đủ.</p>
                <p style={textStyle}><strong>3. Tôi có thể thay đổi lịch hẹn không?</strong> Có, hãy liên hệ với chúng tôi để thay đổi lịch hẹn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(HomeFooter);
