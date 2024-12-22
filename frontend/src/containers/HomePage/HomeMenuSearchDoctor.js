import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { emitter } from "../../utils/emitter";
import { getAllDoctors } from "../../services/userService"; // Thay đổi hàm này để lấy danh sách bác sĩ

var options = [];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  menuDoctor: {
    position: "absolute !important",
    top: "55px !important",
    left: "310px !important",
  },
  titleHeader: {
    fontWeight: "600 !important",
    backgroundColor: "#ebebeb !important",
    marginTop: "-7px !important",
  },
}));

const HomeMenuSearchDoctor = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataDoctor, setDataDoctor] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDataGetAllDoctors = async () => {
      if (dataDoctor.length !== 0) return;
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        let data = res.data ? res.data : [];
        setDataDoctor(data);
      }
    };
    fetchDataGetAllDoctors();
  }, []);

  const makeArrayDoctorOptions = () => {
    options = [];
    dataDoctor.map((item) => options.push(item.name));
  };

  useEffect(() => {
    setOpen(props.showMenuSearchDoctor);
  }, [props.showMenuSearchDoctor]);

  const findIdDoctorByName = (itemName) => {
    let item = dataDoctor.find((element) => element.name === itemName);
    return item.id;
  };

  const handleViewDetail = (itemName) => (event) => {
    let id = findIdDoctorByName(itemName);
    if (history) {
      history.push(`/detail-doctor/${id}`);
    }
    setOpen(false);
  };

  makeArrayDoctorOptions();
  return (
    <Menu
      id="long-menu"
      keepMounted
      open={open}
      onClose={handleClose}
      anchorReference="none"
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 7,
          width: "25ch",
        },
      }}
      className={classes.menuDoctor}
    >
      <MenuItem key={"doctor"} className={classes.titleHeader}>
        {/* Tiêu đề hoặc mô tả của Menu */}
      </MenuItem>

      {options.map((option) => (
        <MenuItem key={option} onClick={handleViewDetail(option)}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HomeMenuSearchDoctor;
