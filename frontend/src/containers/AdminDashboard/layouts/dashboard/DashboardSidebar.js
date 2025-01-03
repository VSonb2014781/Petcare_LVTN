import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-domv6";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Avatar,
  Typography,
  Drawer,
} from "@mui/material";
// mocks_
import account from "../../_mocks_/account";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
// 
import sidebarConfig from "./SidebarConfig";
import sidebarConfigDoctor from "./SidebarConfigDoctor";

import { useSelector } from "react-redux";
import { USER_ROLE } from "../../../../utils";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  const { isLoggedIn, userInfo } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  }));

  const [userInfoState, setUserInfoState] = useState({});
  const [imageBase64State, setImageBase64State] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [selected, setSelected] = useState(false); // State to track selection

  useEffect(() => {
    setUserInfoState(userInfo);
    let imageBase64 = "";
    if (userInfo && userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      setImageBase64State(imageBase64);
    }

    // name
    let nameCopy = "";
    if (userInfo && userInfo.lastName && userInfo.firstName) {
      nameCopy = `${userInfo.lastName} ${userInfo.firstName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName && userInfo.firstName === null) {
      nameCopy = `${userInfo.lastName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName === null && userInfo.firstName) {
      nameCopy = `${userInfo.firstName}`;
      setName(nameCopy);
    }

    // role
    if (userInfo && userInfo.roleId && userInfo.roleId === USER_ROLE.ADMIN) {
      setRole("ADMIN");
    }
    if (userInfo && userInfo.roleId && userInfo.roleId === USER_ROLE.DOCTOR) {
      setRole("DOCTOR");
    }
    if (
      userInfo &&
      userInfo.roleId &&
      userInfo.roleId !== USER_ROLE.DOCTOR &&
      userInfo.roleId !== USER_ROLE.ADMIN
    ) {
      setRole("");
    }
  }, [userInfo]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
      </Box>
      
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar
              src={imageBase64State ? imageBase64State : account.photoURL}
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {role ? role : ""}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <Box sx={{ px: 2.5, py: 2, display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
          <Logo />
        </Box>

        <Box sx={{ px: 2.5, py: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* Main Menu Label with conditional color */}
          <label
            onClick={() => setSelected(!selected)} // Toggle the selected state on click
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: selected ? "#007bff" : "#333", // Change color if selected
              cursor: "pointer", // Add cursor style for better UX
              textAlign: "center", // Center the text horizontally
            }}
          >
            MAIN MENU
          </label>
        </Box>
      {/* sidebar admin */}
      {userInfoState && userInfoState.roleId === USER_ROLE.ADMIN && (
        <NavSection navConfig={sidebarConfig} />
      )}

      {/* sidebar doctor */}
      {userInfoState && userInfoState.roleId === USER_ROLE.DOCTOR && (
        <NavSection navConfig={sidebarConfigDoctor} />
      )}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
