import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "../../Footer/Footer";
import HomeHeader from "../HomeHeader";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import "./ListSpecialty.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: "0px",
    zIndex: "100",
  },
  menu: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    border: "1px solid #0000",
  },
  menuTitle: {
    color: "#000000",
    fontSize: "20px",
    fontWeight: "bold",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#000000",
  },
  menuIcon: {
    fontSize: "25px",
    color: "#000000",
  },
  doctorsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",  // Khoảng cách giữa các card
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  doctorCard: {
    width: "23%", // Mỗi card chiếm 1/4 chiều rộng của container
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
    },
  },
  doctorImage: {
    width: "100%",
    height: "200px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  doctorName: {
    padding: "10px 15px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
  doctorSpecialty: {
    padding: "5px 15px",
    fontSize: "14px",
    textAlign: "center",
    color: "#777777",
  },
}));

const ListOutStandingDoctor = () => {
  const classes = useStyles();
  const [arrDoctors, setArrDoctors] = useState([]);
  const allDoctors = useSelector((state) => state.admin.allDoctors);
  const language = useSelector((state) => state.app.language);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.fetchAllDoctors());
  }, [dispatch]);

  useEffect(() => {
    setArrDoctors(allDoctors);
  }, [allDoctors]);

  const handleViewDetailDoctor = (doctor) => {
    history.push(`/detail-doctor/${doctor.id}`);
  };

  const handleOnClickBackHome = () => {
    history.push(`/home`);
  };

  return (
    <>
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="home-header-banner"></div>
        <div className="detail-specialty-body">
          <div className="description-specialty11">
            <AppBar position="static" className={classes.menu}>
              <Toolbar variant="dense">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  onClick={handleOnClickBackHome}
                  aria-label="back"
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
                <Typography variant="h5" className={classes.menuTitle}>
                  Nhân sự
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper className={classes.root}>
              <div className={classes.doctorsContainer}>
                {arrDoctors.map((item, index) => {
                  const imageBase64 = item.image
                    ? new Buffer(item.image, "base64").toString("binary")
                    : "";
                  const nameVi = `${item.lastName} ${item.firstName}`;
                  const nameEn = `${item.firstName} ${item.lastName}`;
                  const specialtyName =
                    item.Doctor_Infor?.specialtyData?.name || "";

                  return (
                    <div
                      key={index}
                      className={classes.doctorCard}
                      onClick={() => handleViewDetailDoctor(item)}
                    >
                      <div
                        className={classes.doctorImage}
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      ></div>
                      <div className={classes.doctorName}>
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                      </div>
                      <div className={classes.doctorSpecialty}>
                        {specialtyName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Paper>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ListOutStandingDoctor;
