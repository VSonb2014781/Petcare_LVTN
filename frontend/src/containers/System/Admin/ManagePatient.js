import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import Swal from "sweetalert2";
import { LANGUAGES } from "../../../utils";
import { getAllPatientForDoctor1, cancelBooking } from "../../../services/userService";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      dataPatient: [],
      statusFilter: "", // Added status filter state
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    const { user } = this.props;
    const { currentDate, statusFilter } = this.state;
    const formattedDate = new Date(currentDate).getTime();

    if (user && user.id) {
      let res = await getAllPatientForDoctor1({
        userid: user.id,
        date: formattedDate,
        status: statusFilter, // Passing the status filter to the API request
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataPatient: res.data,
        });
      }
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] }, async () => {
      await this.getDataPatient();
    });
  };


  handleStatusChange = (e) => {
    this.setState({ statusFilter: e.target.value }, async () => {
      await this.getDataPatient(); // Fetch data again with the new status filter
    });
  };

  render() {
    const { dataPatient, isShowLoading, statusFilter } = this.state;
    const { language } = this.props;

    return (
      <LoadingOverlay
        active={isShowLoading}
        spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
      >
        <div className="manage-patient-container">
          <div className="m-p-title">lịch hẹn thú cưng của khách hàng</div>
          <div className="manage-patient-body row">
            <div className="col-4 form-group">
              <label>Chọn ngày đặt dịch vụ</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
               <label>Chọn trạng thái </label>
               <select
                className="form-control"
                value={statusFilter}
                onChange={this.handleStatusChange}
              >
                <option value="">Tất cả</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="cancelled">Đã hủy</option>
                <option value="completed">Hoàn thành</option>
              </select>
              <Container>
              <table className="table table-hover mt-4">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Dịch vụ</th>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Thông tin thú cưng</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      let time =
                        language === LANGUAGES.VI
                          ? item.timeTypeDataPatient.valueVi
                          : item.timeTypeDataPatient.valueEn;
                      let status =
                        language === LANGUAGES.VI
                          ? item.statusIdDataPatient.valueVi
                          : item.statusIdDataPatient.valueEn;
                      let specialtyName = item.doctorData?.specialtyData?.name || "N/A";
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{time}</td>
                          <td>{specialtyName}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.address}</td>
                          <td>{item.patientData.email}</td>
                          <td>{item.patientData.reason}</td>
                          <td>{item.patientData.phonenumber || ""}</td>
                          <td>{status}</td>    
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Container>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, user: state.user.userInfo };
};

export default connect(mapStateToProps)(ManagePatient);
