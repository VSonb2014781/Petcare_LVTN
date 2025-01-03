import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { fShortenNumber } from "../../../utils/formatNumber";
import Iconify from "../../../components/Iconify";
import { getTotalNewUserDay } from "../../../../../services/userService";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function AppNewUsers() {
  const [totalNewUserDay, setTotalNewUserDay] = useState(0);
  useEffect(() => {
    const fetchTotalNewUserDay = async () => {
      let res = await getTotalNewUserDay();
      if (res && res.errCode === 0) {
        let total = res.data.totalNewUserDay;
        if (total) {
          setTotalNewUserDay(total);
        }
      }
    };
    fetchTotalNewUserDay();
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="carbon:user-follow" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(totalNewUserDay)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Người dùng mới
      </Typography>
    </RootStyle>
  );
}
