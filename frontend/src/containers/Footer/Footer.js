import React, { Component } from "react";
import { connect } from "react-redux";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, GlobalOutlined, FacebookOutlined, YoutubeOutlined, InstagramOutlined } from "@ant-design/icons";

class Footer extends Component {
  handleClickSeeMoreSpecialty = () => {
    this.props.history.push(`/list-specialty`);
  };

  render() {
    const boldIconStyle = { fontWeight: "bold", fontSize: "14px", color: "#e15b35" };
    const textStyle = { fontSize: "14px", color: "#000000" };
    const titleStyle = { color: "#000000", fontSize: "18px", fontWeight: "bold" };
    const iconStyle = { fontSize: "24px", margin: "0 8px", color: "#e15b35", cursor: "pointer" };

    return (
      <div className="section-share section-specialty" style={{ backgroundColor: "#fff" }}>
        <div className="section-container">
          <div className="wrapper-footer" style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
            {/* Phần 1: Thông tin hệ thống */}
            <div style={{ flex: "1 1 25%", padding: "10px", boxSizing: "border-box" }}>
              <h5 style={titleStyle}>HỆ THỐNG CHĂM SÓC THÚ CƯNG PET VIỆT NAM</h5>
              <p style={textStyle}>
                Giấy đăng kí kinh doanh số: <strong>4001205670</strong> do Chi cục Thuế khu vực Tam Kỳ - Phú Ninh cấp ngày <strong>17/04/2020</strong>
              </p>
              <div style={{ marginTop: "10px" }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FacebookOutlined style={iconStyle} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <YoutubeOutlined style={iconStyle} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined style={iconStyle} />
                </a>
              </div>
            </div>

            {/* Phần 2: Thông tin liên hệ */}
            <div style={{ flex: "1 1 25%", padding: "10px", boxSizing: "border-box" }}>
              <h6 style={titleStyle}>THÔNG TIN LIÊN HỆ</h6>
              <p style={textStyle}>
                <EnvironmentOutlined style={boldIconStyle} /> Địa chỉ: Số 31 Tôn Đức Thắng, An Sơn, Tam Kỳ, Quảng Nam
              </p>
              <p style={textStyle}>
                <PhoneOutlined style={boldIconStyle} /> Điện thoại: 0941.579.007 / 0393.434.115
              </p>
              <p style={textStyle}>
                <MailOutlined style={boldIconStyle} /> Email: petcarevn@gmail.com
              </p>
              <p style={textStyle}>
                <GlobalOutlined style={boldIconStyle} /> Website:{" "}
                <a href="https://bacsithucung.vn" style={{ color: "#e15b35" }}>
                  <strong>https://petcare.vn</strong>
                </a>
              </p>
            </div>

            {/* Phần 3: Thông tin */}
            <div style={{ flex: "1 1 25%", padding: "10px", boxSizing: "border-box" }}>
              <h6 style={titleStyle}>THÔNG TIN</h6>
              <ul style={{ paddingLeft: "20px", fontSize: "16px", color: "#000000" }}>
                <li>
                  <a href="/list-specialty" style={{ color: "#e15b35" }}>
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a href="/branches" style={{ color: "#e15b35" }}>
                    Hệ thống chi nhánh
                  </a>
                </li>
                <li>
                  <a href="/news" style={{ color: "#e15b35" }}>
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="/terms" style={{ color: "#e15b35" }}>
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="/privacy" style={{ color: "#e15b35" }}>
                    Chính sách bảo mật thông tin
                  </a>
                </li>
              </ul>
            </div>

            {/* Phần 4: FAQ */}
            <div style={{ flex: "1 1 25%", padding: "10px", boxSizing: "border-box" }}>
              <h6 style={titleStyle}>FANPAGE</h6>
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

export default connect(mapStateToProps)(Footer);
