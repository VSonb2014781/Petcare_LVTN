import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { RegisterForm } from "../sections/authentication/register";
import AuthSocial from "../sections/authentication/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Đăng Ký | Minimal-UI">
      <AuthLayout>
        Bạn đã có tài khoản? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Đăng Nhập
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Quản lý công việc hiệu quả hơn với Minimal
        </Typography>
        <img
          alt="register"
          src="/static/illustrations/illustration_register.png"
        />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Bắt đầu hoàn toàn miễn phí.
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Miễn phí mãi mãi. Không cần thẻ tín dụng.
            </Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            Khi đăng ký, tôi đồng ý với&nbsp;
            <Link underline="always" color="textPrimary">
              Điều khoản Dịch vụ
            </Link>
            &nbsp;và&nbsp;
            <Link underline="always" color="textPrimary">
              Chính sách Bảo mật
            </Link>
            &nbsp;của Minimal.
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: "center",
              display: { sm: "none" },
            }}
          >
            Bạn đã có tài khoản?&nbsp;
            <Link underline="hover" to="/login" component={RouterLink}>
              Đăng Nhập
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
