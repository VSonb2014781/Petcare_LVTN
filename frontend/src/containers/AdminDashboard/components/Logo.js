import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-domv6";
// material
import { Box } from "@mui/material";
import logo from "../../../assets/logo1.png";


// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src={logo}
        sx={{ width: 100, height: 100, ...sx }}
      />
    </RouterLink>
  );
}
