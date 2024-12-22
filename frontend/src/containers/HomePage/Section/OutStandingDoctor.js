import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  handleOnClickSeeMoreDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/list-oustanding-doctor`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
        <div style={{ marginBottom: "5px"}}>
          <div className="section-header">
            <span className="title-section">NHÂN SỰ NỔI BẬT</span>
            <div
                className="logo"
              ></div>
            <button
              className="btn-section"
              onClick={() => this.handleOnClickSeeMoreDoctor()}
            >
              <FormattedMessage id="homepage.more-infor" />
              
            </button>
          </div>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.firstName} ${item.lastName}`;
                  
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                        <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                          <span style={{ fontWeight: 'bold' }}>Dịch vụ nổi bật: </span>
                          {item.Doctor_Infor &&
                          item.Doctor_Infor.specialtyData &&
                          item.Doctor_Infor.specialtyData.name
                            ? item.Doctor_Infor.specialtyData.name
                            : ""}
                        </div>
                      </div>
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
