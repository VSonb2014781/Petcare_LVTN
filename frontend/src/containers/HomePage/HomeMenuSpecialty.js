import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { emitter } from "../../utils/emitter";

import { getAllSpecialty } from "../../services/userService";

var options = [];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  menuSpecialty: {
    position: "absolute !important",
    top: "74px !important",
    left: "460px !important",
  },
  titleHeader: {
    fontWeight: "600 !important",
    backgroundColor: "#e319C99 !important",
    marginTop: "-7px !important",
  },
}));

const HomeMenuSpecialty = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataSpecialty, setDataSpecialty] = useState([]);

  const handleClick = (event) => {
    // Mã xử lý khi click vào menu (nếu cần)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDataGetAllSpecialty = async () => {
      if (dataSpecialty.length !== 0) return;
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        let data = res.data ? res.data : [];
        setDataSpecialty(data);
      }
    };
    fetchDataGetAllSpecialty();
  }, []);

  const makeArraySpecialtyOptions = () => {
    options = [];
    dataSpecialty.map((item) => options.push(item.name));
  };

  useEffect(() => {
    setOpen(props.showMenuSearchSpecialty);
  }, [props.showMenuSearchSpecialty]);

  const findIdSpecialtyByName = (itemName) => {
    let item = dataSpecialty.find((element) => element.name === itemName);
    return item ? item.id : null;
  };

  const handleViewDetail = (itemName) => () => {
    let id = findIdSpecialtyByName(itemName);
    if (history && id) {
      history.push(`/detail-specialty/${id}`);
    }
    setOpen(false);
  };

  makeArraySpecialtyOptions();

  return (
    <Menu
      id="long-menu"
      keepMounted
      open={open}
      onClose={handleClose}
      anchorReference="none"
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 6,
          width: "23ch",
        },
      }}
      className={classes.menuSpecialty}
    >
      <MenuItem key={"specialty"} className={classes.titleHeader}>
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

export default HomeMenuSpecialty;
