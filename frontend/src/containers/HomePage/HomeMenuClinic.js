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
    top: "74px !important",
    left: "600px !important",
  },
  titleHeader: {
    fontWeight: "600 !important",
    backgroundColor: "#319C99 !important",
    marginTop: "-7px !important",
  },
}));

const HomeMenuClinic = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataClinics, setDataClinics] = useState([]);
  const [options, setOptions] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDataGetAllClinics = async () => {
      if (dataClinics.length !== 0) return;
      let res = await getAllClinic();
      console.log("Clinics Data:", res);
      if (res && res.errCode === 0) {
        let data = res.data ? res.data : [];
        setDataClinics(data);
        makeArrayClinicOptions(data);
      }
    };
    fetchDataGetAllClinics();
  }, []);

  const makeArrayClinicOptions = (clinics) => {
    const clinicOptions = clinics.map((item) => item.name);
    setOptions(clinicOptions);
  };

  useEffect(() => {
    setOpen(props.showMenuSearchClinic);
  }, [props.showMenuSearchClinic]);

  const findIdClinicByName = (itemName) => {
    let item = dataClinics.find((element) => element.name === itemName);
    return item ? item.id : null;
  };

  const handleViewDetail = (itemName) => () => {
    let id = findIdClinicByName(itemName);
    if (id && history) {
      history.push(`/detail-clinic/${id}`);
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
        {/* Tiêu đề hoặc phần mô tả của menu */}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} onClick={handleViewDetail(option)}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HomeMenuClinic;
