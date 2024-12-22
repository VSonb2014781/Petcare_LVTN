import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppTotalDoctors,
  AppTotalHealthAppointmentDone,
  AppNewsUpdate,
  AppOrderTimeline,
  AppTopFourVipPatient,
  AppTopThreeDoctorsOfTheYear,
  AppTrafficBySite,
  AppCurrentSubject,
  AppMonthlyRevenueSpecialty,
} from "../sections/@dashboard/app";

import AppWeeklyRevenue from "../sections/@dashboard/app/AppWeeklyRevenue";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
        <Box sx={{ pb: 5, textAlign: 'left' }}>  {/* Căn lề trái cho Box */}
          <Typography variant="h4">Xin chào, chào mừng trở lại</Typography>
        </Box>
        <Grid container spacing={3} sx={{ textAlign: 'left' }}>  {/* Căn lề trái cho Grid */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklyRevenue />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalHealthAppointmentDone />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalDoctors />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTopThreeDoctorsOfTheYear />
          </Grid>

          {/* Các phần tử khác nếu cần thiết có thể thêm vào */}
        </Grid>
    </Page>
  );
}
