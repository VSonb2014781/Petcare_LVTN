import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

import { postVerifyRetrievePassword } from "../../services/userService";
import { toast } from "react-toastify";
import HomeHeader from "../HomePage/HomeHeader";

const useStyles = makeStyles((theme) => ({
  retrieveBackground: {
    background: "#f0f2f5",
    height: "100vh",
  },
  container: {
    width: "400px",
    borderRadius: "10px",
    backgroundColor: "white",
    position: "absolute",
    margin: "auto",
    boxShadow:
      "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%) !important",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: "300px",
    padding: "0 10px 14px 10px",
    color: "#f0f2f5",
  },
  titleRetrieve: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "24px",
    paddingTop: "10px",
    color: "#000000",
  },
  textField: {
    width: "100%",
  },
  margin: {
    marginRight: theme.spacing(1),
  },
  btnRetrieve: {
    textAlign: "center",
  },
  ButtonbtnRetrieve: {
    backgroundColor: " #e15b35 !important",
    margin: "10px 0",
    height: "30px",
    borderRadius: "15px",
    outline: "none",
    border: "none",
    color: "white",
  },
}));

const RetrievePassword = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.title = "Khôi phục mật khẩu";
    let params = new URLSearchParams(window.location.search);
    if (params.has("tokenUser") && params.has("email")) {
      let tokenUser = params.get("tokenUser");
      let emailUser = params.get("email");
      setValues({ ...values, email: emailUser });
    }
  }, []);

  const handleRetrievePassword = async () => {
    if (
      values.newPassword
        .trim()
        .localeCompare(values.confirmNewPassword.trim()) === 0
    ) {
      let params = new URLSearchParams(window.location.search);
      if (params.has("tokenUser") && params.has("email")) {
        let tokenUser = params.get("tokenUser");
        let emailUser = params.get("email");
        let res = await postVerifyRetrievePassword({
          tokenUser: tokenUser,
          email: emailUser,
          newPassword: values.newPassword,
        });

        if (res && res.errCode === 0) {
          toast.success("Khôi phục mật khẩu thành công!");
          history.push("/login");
        } else {
          toast.error("Khôi phục mật khẩu thất bại!");
        }
      }
    } else {
      toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp!");
    }
  };

  const classes = useStyles();
  return (
    <>
      <HomeHeader />
      <div className={classes.retrieveBackground}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.titleRetrieve}>
              KHÔI PHỤC MẬT KHẨU
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              id="standard-textarea"
              label="Email"
              InputProps={{
                readOnly: true,
              }}
              multiline
              maxRows={12}
              value={values.email}
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Mật khẩu mới
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showNewPassword ? "text" : "password"}
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showNewPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Xác nhận mật khẩu
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showConfirmNewPassword ? "text" : "password"}
                value={values.confirmNewPassword}
                onChange={handleChange("confirmNewPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmNewPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showConfirmNewPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.btnRetrieve}>
            <Button
              variant="contained"
              className={classes.ButtonbtnRetrieve}
              onClick={() => handleRetrievePassword()}
            >
              Khôi phục
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default RetrievePassword;
