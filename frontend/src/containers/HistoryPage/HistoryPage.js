import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HistoryPage.scss";
import DatePicker from "../../components/Input/DatePicker";
import {
  cancelBooking,
  getListAppointmentsForUser,
  getAllUsers,
  postSendRemedy,
  postCreateRemedy,
} from "../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../utils";
import RemedyModal from "../System/Doctor/RemedyModal";
import CreateImageRemedyModal from "../System/Doctor/CreateImageRemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import HomeHeader from "../HomePage/HomeHeader";
import { Row, Col } from "reactstrap"; 

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      isOpenCreateImageRemedyModal: false,
      dataModal: {},
      dataModalCreateRemedy: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    if (user && user.id) {
      let res = await getListAppointmentsForUser({
        userId: user.id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataPatient: res.data,
        });
      }
    }
  };
  

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.user !== prevProps.user) {
      await this.getDataPatient();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      reason:item.reason,
      patientName: item.patientData.firstName,
      imageRemedy: item.imageRemedy,
      token: item.token,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  handleBtnCreateRemedy = (item) => {
    let name = null;
    if (
      this.props.user &&
      this.props.user.firstName &&
      this.props.user.lastName
    ) {
      name = `${this.props.user.lastName} ${this.props.user.firstName}`;
    }
    if (
      this.props.user &&
      this.props.user.firstName &&
      this.props.user.lastName === null
    ) {
      name = `${this.props.user.firstName}`;
    }
    if (
      this.props.user &&
      this.props.user.firstName === null &&
      this.props.user.lastName
    ) {
      name = `${this.props.user.lastName}`;
    }
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      date: item.date,
      token: item.token,
      timeType: item.timeType,
      reason:item.reason,
      patientName: item.patientData.firstName,
      doctorName: name,
    };
    this.setState({
      isOpenCreateImageRemedyModal: true,
      dataModalCreateRemedy: data,
    });
  };

  handleBtnCancel = async (item) => {
    this.setState({ isShowLoading: true });
    let res = await cancelBooking({
      doctorId: item.doctorId,
      patientId: item.patientId,
      timeType: item.timeType,
      reason:item.reason,
      date: item.date,
      statusId: item.statusId,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Hủy cuộc hẹn thành công!");
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: true });
      toast.error("Something wrongs...!");
    }
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  closeCreateImageRemedyModal = () => {
    this.setState({
      isOpenCreateImageRemedyModal: false,
      dataModalCreateRemedy: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({ isShowLoading: true });

    let totalCostData = null;
    let specialtyIdData = null;
    if (
      this.props.user &&
      this.props.user.Doctor_Infor &&
      this.props.user.Doctor_Infor.priceTypeData &&
      this.props.user.Doctor_Infor.priceTypeData.valueEn
    ) {
      totalCostData = this.props.user.Doctor_Infor.priceTypeData.valueEn;
    }
    if (
      this.props.user &&
      this.props.user.Doctor_Infor &&
      this.props.user.Doctor_Infor.specialtyId
    ) {
      specialtyIdData = this.props.user.Doctor_Infor.specialtyId;
    }

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      reason:dataModal.reason,
      language: this.props.language,
      patientName: dataModal.patientName,
      totalCost: totalCostData,
      specialtyId: specialtyIdData,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Giửi hóa đơn thành công!");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: true });
      toast.error("Something wrongs...!");
    }
    this.setState({ isShowLoading: false });
  };

  createRemedyImage = async (dataChild) => {
    let { dataModalCreateRemedy } = this.state;
    this.setState({ isShowLoading: true });

    let res = await postCreateRemedy({
      email: dataChild.email,
      listMedicine: dataChild.listMedicine,
      desciption: dataChild.desciption,
      doctorId: dataModalCreateRemedy.doctorId,
      patientId: dataModalCreateRemedy.patientId,
      timeType: dataModalCreateRemedy.timeType,
      reason:dataModalCreateRemedy.reason,
      date: dataModalCreateRemedy.date,
      token: dataModalCreateRemedy.token,
      language: this.props.language,
      patientName: dataModalCreateRemedy.patientName,
      doctorName: dataModalCreateRemedy.doctorName,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Create Remedy succeed!");
      this.closeCreateImageRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: true });
      toast.error("Something wrongs...!");
    }
    this.setState({ isShowLoading: false });
  };

  // render() {
  //   let {
  //     dataPatient,
  //     isOpenRemedyModal,
  //     isOpenCreateImageRemedyModal,
  //     dataModal,
  //     dataModalCreateRemedy,
  //   } = this.state;
  //   let { language } = this.props;

  //   return (
  //     <>
  //     <HomeHeader/>
  //     <div className="home-header-banner"></div>
  //       <LoadingOverlay
  //         active={this.state.isShowLoading}
  //         spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
  //       >
  //         <div className="manage-patient-container">
  //           <div className="m-p-title">lịch hẹn thú cưng của khách hàng </div>
  //           <div className="manage-patient-body row">
  //             <div className="col-12 table-manage-patient">
  //             <Container>
  //             <table className="table table-hover mt-4">
  //                 <tbody>
  //                   <tr>
  //                     <th>STT</th>
  //                     <th>Thời gian</th>
  //                     <th>Dịch vụ</th>
  //                     <th>Họ và tên</th>
  //                     <th>Địa chỉ</th>
  //                     <th>Thôn tin thú cưng</th>
  //                     <th>Số điện thoại</th>
  //                     <th>Actions</th>
  //                   </tr>
  //                   {dataPatient && dataPatient.length > 0 ? (
  //                         dataPatient.map((item, index) => {
  //                           let time =
  //                             language === LANGUAGES.VI
  //                               ? item.timeTypeDataPatient.valueVi
  //                               : item.timeTypeDataPatient.valueEn;
  //                           let specialtyName = item.doctorData?.specialtyData?.name || "N/A";
  //                           return (
  //                             <tr key={index}>
  //                               <td>{index + 1}</td>
  //                               <td>{time}</td>
  //                               <td>{specialtyName}</td>
  //                               <td>{item.patientData.firstName}</td>
                      
  //                               <td>{item.patientData.address}</td>
  //                               <td>{item.patientData.reason || "Không có lý do cụ thể"}</td>
  //                               <td>{item.patientData.phonenumber || "Chưa cập nhật"}</td>
  //                               <td>
  //                                 <button
  //                                   className="mp-btn-cancel"
  //                                   onClick={() => this.handleBtnCancel(item)}
  //                                 >
  //                                   Hủy
  //                                 </button>
  //                               </td>
  //                             </tr>
  //                           );
  //                         })
  //                       ) : (
  //                         <tr>
  //                           <td colSpan="7" style={{ textAlign: "center" }}>
  //                             Không có dữ liệu lịch hẹn
  //                           </td>
  //                         </tr>
  //                       )}
  //                 </tbody>
  //               </table>
  //             </Container>
  //             </div>
  //           </div>
  //         </div>
  //         <RemedyModal
  //           isOpenModal={isOpenRemedyModal}
  //           dataModal={dataModal}
  //           closeRemedyModal={this.closeRemedyModal}
  //           sendRemedy={this.sendRemedy}
  //         />
  //         <CreateImageRemedyModal
  //           isOpenCreateImageRemedyModal={isOpenCreateImageRemedyModal}
  //           dataModalCreateRemedy={dataModalCreateRemedy}
  //           closeCreateImageRemedyModal={this.closeCreateImageRemedyModal}
  //           createRemedyImage={this.createRemedyImage}
  //         />
  //       </LoadingOverlay>
  //     </>
  //   );
  // }



  render() {
    console.log("this.props.userInfo012", this.props.userInfo);
    let {
      dataPatient,
      isOpenRemedyModal,
      isOpenCreateImageRemedyModal,
      dataModal,
      dataModalCreateRemedy,
    } = this.state;
    let { language } = this.props; 

    return (
      <>
        <HomeHeader />
        <div className="home-header-banner"></div>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Lịch hẹn thú cưng của khách hàng</div>
            <div className="manage-patient-body row">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Ngày đặt lịch</th>
                      <th>Dịch vụ</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Email</th>
                      <th>Thông tin thú cưng</th>
                      <th>Số điện thoại</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                      
                         let specialtyName = item.doctorData?.specialtyData?.name || "N/A";
                         let bookingDate = item.createdAt
                            ? moment(item.createdAt).format("DD/MM/YYYY")
                            : "Không xác định"; // Định dạng ngày tháng

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{bookingDate}</td>
                            <td>{specialtyName }</td>
                            <td>{`${item.patientData.lastName} ${item.patientData.firstName}`}</td> 
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.email}</td>
                            <td>{item.patientData.reason || "Không có lý do cụ thể"}</td>
                            <td>{item.patientData.phonenumber || "Chưa cập nhật"}</td>
                            <td>
                                  <button
                                    className="mp-btn-cancel"
                                    onClick={() => this.handleBtnCancel(item)}
                                  >
                                    Hủy
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                              Không có dữ liệu lịch hẹn
                            </td>
                          </tr>
                        )}
                  </tbody>
                </table>
              
              </div>
            </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
          <CreateImageRemedyModal
            isOpenCreateImageRemedyModal={isOpenCreateImageRemedyModal}
            dataModalCreateRemedy={dataModalCreateRemedy}
            closeCreateImageRemedyModal={this.closeCreateImageRemedyModal}
            createRemedyImage={this.createRemedyImage}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, user: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
