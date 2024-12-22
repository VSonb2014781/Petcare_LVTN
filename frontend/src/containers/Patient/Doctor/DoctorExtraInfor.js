import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import {
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
} from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
           <space>
            CHI TIẾT ĐỊA CHỈ
           </space>
          </div>
          <div className="name-clinic">
              Cơ sở: {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            Địa chỉ: {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
          {extraInfor && extraInfor.imageClinic && (
            <div className="clinic-image">
              <img src={extraInfor.imageClinic} alt="Clinic" />
            </div>
          )}
        </div>
        <div className="content-down">
          <div className="short-infor">
            <div className="span">
            <span>
              GIÁ DỊCH VỤ: 
            </span>
            </div>
            {extraInfor &&
              extraInfor.priceTypeData &&
              language === LANGUAGES.VI && (
                <NumberFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              )}
            {extraInfor &&
              extraInfor.priceTypeData &&
              language === LANGUAGES.EN && (
                <NumberFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
