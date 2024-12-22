import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions/appActions";
import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSpecialty";
import HomeMenuSearchClinic from "./HomeMenuClinic"; 
import HomeMenuDoctor from "./HomeMenuSearchDoctor"; 
import "./HomeHeader.scss";

class HomeHeader extends Component {
  
  constructor() {
    super();
    this.state = {
      showMenuSearchSpecialty: false,
      showMenuSearchClinic: false,
      showMenuDoctor: false,
      showIntroMenu: false,
    };
  }

  handleClickShowHomeMenuSearchSpecialty = () => {
    this.setState({
      showMenuSearchSpecialty: !this.state.showMenuSearchSpecialty,
    });
  };

  handleClickShowHomeMenuSearchClinic = () => {
    this.setState({
      showMenuSearchClinic: !this.state.showMenuSearchClinic,
    });
  };

  handleClickShowHomeMenuDoctor = () => {
    this.setState({
      showMenuDoctor: !this.state.showMenuDoctor,
    });
  };

  handleClickShowIntroMenu = () => {
    this.setState({
      showIntroMenu: !this.state.showIntroMenu,
    });
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleNavigateToHistory = () => {
    if (this.props.history) {
      this.props.history.push(`/history`);
    }
  };

  handleNavigateToStaffTeam = () => {
    if (this.props.history) {
      this.props.history.push(`/staff-team`);
    }
  };

  handleNavigateToContact = () => {
    if (this.props.history) {
      this.props.history.push(`/contact`);
    }
  };

  handleNavigateToInfo = () => {
    if (this.props.history) {
      this.props.history.push(`/info`);
    }
  };
  handleNavigateLogin= () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };
  handleNavigateSignup=()=>{
    if(this.props.history){
      this.props.history.push(`/sign-up`)
    }
  }

  render() {
    console.log("this.props.userInfo1", this.props.userInfo);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="menu-home-header">
                <MenuHomeHeader />
              </div>
              <div
                className="header-logo"
                onClick={() => {
                  this.returnToHome();
                }}
              ></div>
            </div>

            <div className="center-content">
              <div className="child-content" onClick={this.returnToHome}>
                <b>
                  <FormattedMessage
                    id="home-header.info"
                    defaultMessage="TRANG CHỦ"
                  />
                </b>
              </div>
              <div
                className="child-content"
                onClick={this.handleClickShowHomeMenuSearchSpecialty}
              >
                <b>
                  <FormattedMessage
                    id="home-header.service"
                    defaultMessage="DỊCH VỤ"
                  />
                </b>
              </div>
              <div
                className="child-content"
                onClick={this.handleClickShowHomeMenuSearchClinic}
              >
                <b>
                  <FormattedMessage
                    id="home-header.petCareFacility"
                    defaultMessage="CƠ SỞ"
                  />
                </b>
              </div>
              <div className="child-content" onClick={this.handleClickShowIntroMenu}>
                <b>
                  <FormattedMessage
                    id="home-header.staffAndDoctors"
                    defaultMessage="GIỚI THIỆU"
                  />
                </b>
                {this.state.showIntroMenu && (
                  <div className="intro-menu">
                    <div className="option" onClick={this.handleNavigateToHistory}>
                      Lịch sử
                    </div>
                    <div className="option" onClick={this.handleNavigateToStaffTeam}>
                      Đội ngũ nhân viên
                    </div>
                  </div>
                )}
              </div>
              <div className="child-content" onClick={this.handleNavigateLogin}>
                <b>
                  <FormattedMessage
                    id="home-header.contact"
                    defaultMessage="ĐĂNG NHẬP"
                  />
                </b>
              </div>
              <div className="child-content" onClick={this.handleNavigateSignup}>
                <b>
                  <FormattedMessage
                    id="home-header.contact"
                    defaultMessage="ĐĂNG KÝ"
                  />
                </b>
              </div>
            </div>

            {/* <div className="right-content">
              <div className="support">
                <div
                  className="search"
                  onClick={this.handleClickShowHomeMenuDoctor}
                >
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Tìm kiếm....." />
                  {this.state.showMenuDoctor && (
                    <HomeMenuDoctor
                      showMenuDoctor={this.state.showMenuDoctor}
                    />
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {this.props.isShowBanner && (
          <div className="home-header-banner">
          </div>
        )}
        {this.state.showMenuSearchSpecialty && (
          <HomeMenuSearchSpecialty
          showMenuSearchSpecialty={this.state.showMenuSearchSpecialty}
          />
        )}

        {this.state.showMenuSearchClinic && (
          <HomeMenuSearchClinic
            showMenuSearchClinic={this.state.showMenuSearchClinic}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userInfo: state.user.userInfo,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
