import React, { useState, useEffect } from "react";
import MyflixLogo from "./myflix_logo.jpeg";

import SignIn from "./Signin";
import Register from "./Register";

import {
  AppBar,
  Toolbar,
  IconButton,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemTex,
  Container,
  Button,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PublishIcon from "@material-ui/icons/Publish";

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.css";
import Tooltip from "@material-ui/core/Tooltip";

import "./Nav.css";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `flex-end`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    display: "flex",
    color: `white`,
  },
  formControl: {
    minWidth: 100,
    marginRight: "25px",
    paddingBottom: "10px",
    color: `white`,
  },
  nav: {
    top: 0,
    height: "57px",
    zIndex: 1,
    position: `fixed`,
  },

  userName: {
    color: `white`,
    marginTop: 13,
  },
  input: {
    color: `white`,
  },
});

const USERS = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const currentUser = localStorage.getItem("currentUser");

function NavigationBar({
  genre,
  setGenre,
  handleGenre,
  language,
  setLanguage,
  handleLanguage,
  sortableOptions,
  sortOption,
  setSortOption,
  handleSort,
  uniqueGenres,
  uniqueLanguages,
  history,
  setLoggedIn,
  setUploadAcc,
}) {
  const classes = useStyles();

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setGoingUp(true);
      } else {
        setGoingUp(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
    setUploadAcc(false);

    history.push("/");
  };

  const handleHome = () => {
    setGenre("");
    setLanguage("");
    setSortOption("");
  };

  const checkUploadAccess = () => {
    if (currentUser) {
      const userObj = USERS.find((obj) => obj.email === currentUser);
      if (userObj) {
        console.log(userObj);
        if (userObj.adminAcces === true) {
          return true;
        }
      }
    }
  };

  const handleUpload = () => {
    history.push("/upload");
  };

  const getUserName = () => {
    if (currentUser) {
      const userObj = USERS.find((obj) => obj.email === currentUser);
      if (userObj) {
        return userObj.userName.toUpperCase();
      }
    }
  };

  return (
    <div>
      <AppBar className={classes.nav}>
        <Toolbar>
          <Tooltip title="Home">
            <Button
              edge="start"
              color="inherit"
              aria-label="home"
              onClick={(e) => handleHome()}
            >
              <Home fontSize="large" />
            </Button>
          </Tooltip>

          <FormControl className={classes.formControl}>
            <InputLabel>Genres</InputLabel>
            <Select value={genre} onChange={handleGenre}>
              {" "}
              {uniqueGenres.map((movie) => (
                <MenuItem value={movie.genre}>{movie.genre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Language</InputLabel>
            <Select value={language} onChange={handleLanguage}>
              {" "}
              {uniqueLanguages.map((movie) => (
                <MenuItem value={movie.language}>{movie.language}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSort}>
              {" "}
              {sortableOptions.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Container className={classes.navbarDisplayFlex}>
            <span className={classes.userName}>
              <b> {getUserName()}</b>
            </span>
            <Tooltip title="Upload">
              <Button
                color="inherit"
                disabled={checkUploadAccess() ? false : true}
                onClick={handleUpload}
              >
                <PublishIcon fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="LogOut">
              <Button color="inherit" onClick={handlelogout}>
                <ExitToAppIcon fontSize="large" />
              </Button>
            </Tooltip>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
