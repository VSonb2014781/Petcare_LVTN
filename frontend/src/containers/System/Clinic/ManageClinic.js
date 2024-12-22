import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ListClinic from "./ListClinic"; // Assuming you have a ListClinic component
import { createNewClinic, updateClinicByIdService } from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      action: CRUD_ACTIONS.CREATE, // Initially set to CREATE
      clinicEditId: "", // Store the ID for the clinic being edited
      showCreateForm: false, // Toggle state to show form
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.clinics !== this.state.clinics) {
        await this.fetchClinics();
    }
}

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  // handleSaveClinic = async () => {

  //   let { action } = this.state;

  //   if (action === CRUD_ACTIONS.CREATE) {
  //     let res = await createNewClinic(this.state);
  //     if (res && res.errCode === 0) {
  //       toast.success("Thêm cơ sở mới thành công!");
  //       this.setState({
  //         name: "",
  //         address: "",
  //         imageBase64: "",
  //         descriptionHTML: "",
  //         descriptionMarkdown: "",
  //       });
  //     } else {
  //       toast.error("Có gì đó không ổn!");
  //     }
  //   }
  //   // Add logic for edit if needed
  // };


  // handleEditClinic = (clinic) => {

  //   this.setState({
  //     name: clinic.name,
  //     address: clinic.address,
  //     imageBase64: clinic.imageBase64,
  //     descriptionHTML: clinic.descriptionHTML,
  //     descriptionMarkdown: clinic.descriptionMarkdown,
  //     action: CRUD_ACTIONS.EDIT,
  //     clinicEditId: clinic.id,
  //     showCreateForm: true,
  //   });
  // };

  handleSaveClinic = async () => {
    let { action, clinicEditId, name, address, descriptionHTML, descriptionMarkdown, imageBase64 } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success("Thêm cơ sở mới thành công!");
            this.fetchClinics();
            this.setState({
                name: "",
                address: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                action: CRUD_ACTIONS.CREATE,
            });
        } else {
            toast.error("Thêm thất bại!");
        }
    } else if (action === CRUD_ACTIONS.EDIT) {
        // Gửi request chỉnh sửa cơ sở
        let res = await updateClinicByIdService(clinicEditId,{
            name,
            address,
            descriptionHTML,
            descriptionMarkdown,
            imageBase64,
        });

        if (res && res.errCode === 0) {
            toast.success("Chỉnh sửa cơ sở thành công!");
            this.setState({
                name: "",
                address: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                action: CRUD_ACTIONS.CREATE,
                clinicEditId: "",
                showCreateForm: false,
            });
        } else {
            toast.error("Chỉnh sửa thất bại!");
        }
    }
};
  handleEditClinic = (clinic) => {
    this.setState({
        name: clinic.name || "",
        address: clinic.address || "",
        imageBase64: clinic.image || "",
        descriptionHTML: clinic.descriptionHTML || "",
        descriptionMarkdown: clinic.descriptionMarkdown || "",
        action: CRUD_ACTIONS.EDIT,
        clinicEditId: clinic.id,
        showCreateForm: true, // Mở form chỉnh sửa
    });
};


  toggleCreateForm = () => {
    this.setState((prevState) => ({
      showCreateForm: !prevState.showCreateForm,
    }));
  };

  render() {
    let {
      name,
      address,
      imageBase64,
      descriptionMarkdown,
      action,
      clinicEditId,
      showCreateForm,
    } = this.state;

    return (
      <div className="manage-clinic-container">
        <div className="title1">
          <label>QUẢN LÝ CƠ SỞ CHĂM SÓC THÚ CƯNG</label>
        </div>

        <div className="col-12 mb-5">
          <button
            className="btn-colz"
            onClick={this.toggleCreateForm}
          >
            {showCreateForm ? " TRỞ VỀ " : " + THÊM CƠ SỞ "}
          </button>
        </div>

        {showCreateForm ? (
          <div className="add-new-clinic row">
            <div className="col-6 form-group">
              <label>Tên Cơ Sở</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
                <label>Ảnh Dịch Vụ</label>
                {imageBase64 && (
                  <div className="preview-image">
                    <img src={imageBase64} alt="preview" style={{ width: "100px", height: "auto" }} />
                  </div>
                )}
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
              </div>
            <div className="col-6 form-group">
              <label>Địa chỉ Cơ Sở</label>
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button
                className="btn-save-specialty"
                onClick={this.handleSaveClinic}
              >
                {action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu mới"}
              </button>
            </div>
          </div>
        ) : (
          <div className="col-2">
            <ListClinic handleEditClinic={this.handleEditClinic} />
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
