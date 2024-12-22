import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Typography from "@material-ui/core/Typography";
import { getAllClinic } from "../../../services/userService";
import Footer from "../../Footer/Footer";
import HomeHeader from "../HomeHeader";
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
  clinicsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  clinicCard: {
    width: "300px",
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
  clinicImage: {
    width: "100%",
    height: "200px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  clinicName: {
    padding: "10px 15px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
}));

const ListMedicalFacility = () => {
  const classes = useStyles();
  const [dataClinics, setDataClinics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchDataAllClinic = async () => {
      let res = await getAllClinic();
      if (res && res.data) {
        setDataClinics(res.data || []);
      }
    };
    fetchDataAllClinic();
  }, []);

  const handleViewDetailClinic = (clinic) => {
    history.push(`/detail-clinic/${clinic.id}`);
  };

  const handleOnClickBackHome = () => {
    history.push(`/home`);
  };

  return (
    <>
      <div className="detail-specialty-container">
          <HomeHeader/>
          <div className="home-header-banner"></div>
          <div className="detail-specialty-body">
            <div className="description-specialty11">
            <div className={classes.root}>
              <AppBar position="static" className={classes.menu}>
                <Toolbar variant="dense">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    onClick={handleOnClickBackHome}
                    aria-label="menu"
                  >
                    <KeyboardBackspaceIcon className={classes.menuIcon} />
                  </IconButton>
                  <Typography variant="h5" className={classes.menuTitle}>
                    Cơ sở chăm sóc
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            <div className={classes.clinicsContainer}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((clinic, index) => (
                  <div
                    key={index}
                    className={classes.clinicCard}
                    onClick={() => handleViewDetailClinic(clinic)}
                  >
                    <div
                      className={classes.clinicImage}
                      style={{
                        backgroundImage: `url(${clinic.image})`,
                      }}
                    ></div>
                    <div className={classes.clinicName}>{clinic.name}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ListMedicalFacility;
