import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Signup.scss";
import { FormattedMessage } from "react-intl";
import { createNewUserService } from "../../services/userService";
import { toast } from "react-toastify";
import HomeHeader from "../HomePage/HomeHeader";
import Footer from "../Footer/Footer";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "", // New phone number field
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddNewUser();
    }
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage);
      } else {
        toast.success("Tạo tài khoản thành công!");
        this.setState({
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          isShowPassword: false,
        });
        this.props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address", "phoneNumber"]; // Include phoneNumber
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("Thiếu thông tin: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.createNewUser(this.state);
    }
  };

  render() {
    return (
      <>
      <HomeHeader />
      <div className="login-background">
        <div className="signup-container">
          <div className="login-content row">
            <div className="col-12 text-login">
              <FormattedMessage id="signup.title" defaultMessage="ĐĂNG KÝ" />
            </div>
            <div
                className="logo"
              ></div>
            <div className="col-12 form-group login-input">
              <label>
                <FormattedMessage id="signup.email" defaultMessage="Email:" />
              </label>
              <div className="custom-input-password">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập email của bạn"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
            </div>
            <div className="col-12 form-group login-input">
              <label>
                <FormattedMessage id="signup.password" defaultMessage="Mật khẩu:" />
              </label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 form-group login-input">
              <label>
                <FormattedMessage id="signup.firstname" defaultMessage="Tên:" />
              </label>
              <div className="custom-input-password">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên của bạn"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
              </div>
            </div>
            <div className="col-12 form-group login-input">
              <label>
                <FormattedMessage id="signup.lastname" defaultMessage="Họ:" />
              </label>
              <div className="custom-input-password">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập họ của bạn"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            </div>
            <div className="col-12 form-group login-input">
              <label>
                <FormattedMessage id="signup.address" defaultMessage="Địa chỉ:" />
              </label>
              <div className="custom-input-password">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập địa chỉ của bạn"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
            </div>
            <div className="col-12 form-group login-input">
              <label>
                <FormattedMessage id="signup.phoneNumber" defaultMessage="Số điện thoại:" />
              </label>
              <div className="custom-input-password">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập số điện thoại của bạn"
                value={this.state.phoneNumber}
                onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
              />
            </div>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => this.handleAddNewUser()}
              >
                <FormattedMessage id="signup.signupButton" defaultMessage="Đăng Ký" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
