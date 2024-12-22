import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getAllClinic } from "../../services/userService"; // Giả sử bạn có dịch vụ này

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  menuClinic: {
    position: "absolute !important",
    top: "55px !important",
    left: "500px !important",
  },
  titleHeader: {
    fontWeight: "600 !important",
    backgroundColor: "#ebebeb !important",
    marginTop: "-7px !important",
  },
}));

const HomeMenuSearchClinic = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataClinics, setDataClinics] = useState([]);
  const [options, setOptions] = useState([]); // Thêm state cho options

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDataGetAllClinics = async () => {
      if (dataClinics.length !== 0) return;
      let res = await getAllClinic(); // Gọi dịch vụ để lấy danh sách phòng khám
      console.log("Clinics Data:", res); // Kiểm tra dữ liệu
      if (res && res.errCode === 0) {
        let data = res.data ? res.data : [];
        setDataClinics(data);
        makeArrayClinicOptions(data); // Cập nhật options khi có dữ liệu mới
      }
    };
    fetchDataGetAllClinics();
  }, []);

  const makeArrayClinicOptions = (clinics) => {
    const clinicOptions = clinics.map((item) => item.name);
    setOptions(clinicOptions); // Cập nhật options
  };

  useEffect(() => {
    setOpen(props.showMenuSearchClinic);
  }, [props.showMenuSearchClinic]);

  const findIdClinicByName = (itemName) => {
    let item = dataClinics.find((element) => element.name === itemName);
    return item ? item.id : null;
  };

  const handleViewDetail = (itemName) => (event) => {
    let id = findIdClinicByName(itemName);
    if (id && history) {
      history.push(`/detail-clinic/${id}`); // Chuyển hướng đến trang chi tiết phòng khám
    }
    setOpen(false);
  };

  return (
    <Menu
      id="clinic-menu"
      keepMounted
      open={open}
      onClose={handleClose}
      anchorReference="none"
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 7,
          width: "30ch",
        },
      }}
      className={classes.menuClinic}
    >
      <MenuItem key={"clinic"} className={classes.titleHeader}>
      </MenuItem>
      {options.length > 0 ? (
        options.map((option) => (
          <MenuItem key={option} onClick={handleViewDetail(option)}>
            {option}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>Không tìm thấy phòng khám nào.</MenuItem>
      )}
    </Menu>
  );
};

export default HomeMenuSearchClinic;
