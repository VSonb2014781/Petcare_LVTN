import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";

import { postUserForgotPassword } from "../../services/userService";
import { toast } from "react-toastify";
import HomeHeader from "../HomePage/HomeHeader";

const ForgotPassword = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Quên mật khẩu";
  }, []);

  const handleForgotPassword = async () => {
    if (email.trim().length === 0) {
      toast.error("Vui lòng nhập email!");
      return;
    }
    let res = await postUserForgotPassword({
      email: email.trim(),
    });
    if (res && res.errCode === 0) {
      toast.success("Gửi email khôi phục mật khẩu thành công!");
    } else {
      toast.error("Không tìm thấy người dùng, vui lòng nhập lại email!");
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="login-background">
        <div className="forgot-password-container">
          <div className="login-content row">
            <div className="col-12 text-login">QUÊN MẬT KHẨU</div>
            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email của bạn để khôi phục mật khẩu"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  handleForgotPassword();
                }}
              >
                Khôi phục
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
