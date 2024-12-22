import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ListSpecialty from "./ListSpecialty";
// import EditSpecialty from "./EditSpecialty";
import { createNewSpecialty, editSpecialtyById } from "../../../services/userService";


const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      action: CRUD_ACTIONS.CREATE,  // Initially set to CREATE
      specialtyEditId: "",  // Store the ID for the specialty being edited
      showCreateForm: false, // Toggle state to show form
    };
  }

  async componentDidMount() {}

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

  // handleSaveSpecialty = async () => {
  //   let { action } = this.state;

  //   if (action === CRUD_ACTIONS.CREATE) {
  //     let res = await createNewSpecialty(this.state);
  //     if (res && res.errCode === 0) {
  //       toast.success("Thêm dịch vụ mới thành công!");
  //       this.setState({
  //         name: "",
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

  handleSaveSpecialty = async () => {
    let { action, specialtyEditId, name, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;

    console.log("State Data:", { specialtyEditId, name, imageBase64, descriptionHTML, descriptionMarkdown });
    if (!name || !descriptionMarkdown) {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (action === CRUD_ACTIONS.CREATE) {
        let res = await createNewSpecialty({ name, imageBase64, descriptionHTML, descriptionMarkdown });
        if (res && res.errCode === 0) {
            toast.success("Thêm dịch vụ mới thành công!");
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                showCreateForm: false,
            });
        } else {
            toast.error("Có lỗi xảy ra!");
        }
    } else if (action === CRUD_ACTIONS.EDIT) {
      console.log("Editing Specialty ID:", specialtyEditId);

        // Logic chỉnh sửa dịch vụ
        let res = await editSpecialtyById(specialtyEditId, {
          name,
          imageBase64,
          descriptionHTML,
          descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            toast.success("Cập nhật dịch vụ thành công!");
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                action: CRUD_ACTIONS.CREATE,
                showCreateForm: false,
            });
        } else {
            toast.error("Có lỗi xảy ra khi cập nhật!");
        }
    }
};


  handleEditSpecialty = (specialty) => {
    console.log("Editing specialty:", specialty);
    this.setState({
      name: specialty.name,
      imageBase64: specialty.imageBase64,
      descriptionHTML: specialty.descriptionHTML,
      descriptionMarkdown: specialty.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
      specialtyEditId: specialty.id,
      showCreateForm: true,
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
      imageBase64,
      descriptionMarkdown,
      action,
      specialtyEditId,
      showCreateForm,
    } = this.state;

    return (
      <div className="manage-specialty-container">
        <div className="title1">
          <label>QUẢN LÝ DỊCH VỤ</label>
        </div>

        <div className="col-12 mb-5">
          <button
            className="btn-colz"
            onClick={this.toggleCreateForm}
          >
            {showCreateForm ? " TRỞ VỀ " : " + THÊM DỊCH VỤ "}
          </button>
        </div>

        {showCreateForm ? (
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>Tên Dịch Vụ</label>
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
                onClick={this.handleSaveSpecialty}
              >
                {action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu mới"}
              </button>
            </div>
          </div>
        ) : (
          <div className="col-2">
            <ListSpecialty handleEditSpecialty={this.handleEditSpecialty} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
