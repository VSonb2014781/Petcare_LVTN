import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HistoryIcon from "@material-ui/icons/History"; // Thêm icon lịch sử

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

// Styled menu with fade-in effect
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    animation: "fadeIn 0.3s ease",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

// Styled menu item with hover effect
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MenuHomeHeader = () => {
  const { isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
  }));
  const dispatch = useDispatch();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItemMenu = (item) => {
    setSelectedMenu(item);
    setAnchorEl(null); // Close menu after selection
    switch (item) {
      case "login":
        history.push("/login");
        break;
      case "forgot-password":
        history.push("/forgot-password");
        break;
      case "logout":
        dispatch(actions.processLogout());
        break;
      case "sign-up":
        history.push("/sign-up");
        break;
      case "home-page":
        history.push("/home");
        break;
      case "profile":
        history.push("/profile");
        break;
      case "history":
        history.push("/history");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <span
        onClick={handleClick}
        style={{ cursor: "pointer", transition: "transform 0.3s" }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <i className="fas fa-bars"></i>
      </span>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={() => handleClickItemMenu("home-page")}
          className={selectedMenu === "home-page" ? "active" : ""}
        >
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Trang Chủ" />
        </StyledMenuItem>
        {!isLoggedIn && (
          <>
            <StyledMenuItem
              onClick={() => handleClickItemMenu("login")}
              className={selectedMenu === "login" ? "active" : ""}
            >
              <ListItemIcon>
                <VpnKeyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Đăng nhập" />
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => handleClickItemMenu("forgot-password")}
            >
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Quên mật khẩu" />
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => handleClickItemMenu("sign-up")}
              className={selectedMenu === "sign-up" ? "active" : ""}
            >
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Đăng ký tài khoản" />
            </StyledMenuItem>
          </>
        )}
        {isLoggedIn && (
          <>
            <StyledMenuItem
              onClick={() => handleClickItemMenu("profile")}
              className={selectedMenu === "profile" ? "active" : ""}
            >
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary=" Thông tin thú cưng " />
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => handleClickItemMenu("history")}
              className={selectedMenu === "history" ? "active" : ""}
            >
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Lịch sử hẹn lịch" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleClickItemMenu("logout")}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </StyledMenuItem>
          </>
        )}
      </StyledMenu>
    </div>
  );
};

export default MenuHomeHeader;
