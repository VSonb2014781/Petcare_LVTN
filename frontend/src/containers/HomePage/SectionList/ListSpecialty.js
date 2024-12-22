import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Typography from "@material-ui/core/Typography";
import { getAllSpecialty } from "../../../services/userService";
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
  specialtiesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  specialtyCard: {
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
  specialtyImage: {
    width: "100%",
    height: "200px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  specialtyName: {
    padding: "10px 15px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
}));

const ListSpecialty = () => {
  const classes = useStyles();
  const [dataSpecialties, setDataSpecialties] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllSpecialty = async () => {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        setDataSpecialties(res.data || []);
      }
    };
    fetchAllSpecialty();
  }, []);

  const handleViewDetailSpecialty = (specialty) => {
    history.push(`/detail-specialty/${specialty.id}`);
  };

  const handleOnClickBackHome = () => {
    history.push(`/home`);
  };

  return (
    <>
      <div className="list-specialty-container">
        <HomeHeader />
        <div className="home-header-banner"></div>
        <div className="list-specialty-body">
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
                  DỊCH VỤ
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div className={classes.specialtiesContainer}>
            {dataSpecialties &&
              dataSpecialties.length > 0 &&
              dataSpecialties.map((specialty, index) => (
                <div
                  key={index}
                  className={classes.specialtyCard}
                  onClick={() => handleViewDetailSpecialty(specialty)}
                >
                  <div
                    className={classes.specialtyImage}
                    style={{
                      backgroundImage: `url(${specialty.image})`,
                    }}
                  ></div>
                  <div className={classes.specialtyName}>{specialty.name}</div>
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ListSpecialty;
