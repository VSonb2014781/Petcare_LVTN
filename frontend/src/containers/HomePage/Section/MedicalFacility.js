import React, { Component } from "react";
import { connect } from "react-redux";

import "./MedicalFacility.scss";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

import * as ReactDOM from "react-dom";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.data) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  handleSeeMoreMedicalFacility = () => {
    if (this.props.history) {
      this.props.history.push(`/list-medical-facility`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
        <div style={{ marginBottom: "5px"}}>
          <div className="section-header">
            <span className="title-section">CƠ SỞ CHĂM SÓC  </span>
            <div
                className="logo"
              ></div>
            <button
              className="btn-section"
              onClick={() => this.handleSeeMoreMedicalFacility()}
            >
              Xem thêm
            </button>
          </div>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div className="section-customize clinic-child" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                      <div className="customize-border">
                        <div className="outer-bg"></div>
                        <div className="bg-image section-medical-facility" style={{ backgroundImage: `url(${item.image})` }}></div>
                        <div className="clinic-name" style={{ textTransform: "uppercase" }}>{item.name}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
