import React, { useState } from "react";
import Form from "./components/Form";
import { Jumbotron, Container } from "reactstrap";
import Logo from "./logo.svg";
import Thumbnail from "./rrr.jpeg";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Upload({ movies, setMovies, ...rest }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("");

  var dummyDate = new Date();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleBack = () => {
    const { history } = rest;
    history.push("/dashboard");
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (name !== "" && genre !== "" && language !== "") {
      const movie = {
        id: uuidv4(),
        thumbnail: Thumbnail,
        name: name,
        genre: genre,
        language: language,
        rating: 0,
        totalRatings: 0,
        date: dummyDate,
        ratedBy: [],
      };

      setMovies([...movies, movie]);
      setName("");
      setGenre("");
      setLanguage("");
      setSeverity("success");
    } else {
      setSeverity("error");
    }
  };

  return (
    <Container className="text-center">
      <Button
        className="backButton"
        color="inherit"
        onClick={handleBack}
      ></Button>
      <Jumbotron fluid>
        <h3 className="display-6">
          MyFlix
          <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        </h3>

        <Form
          name={name}
          genre={genre}
          language={language}
          handleName={handleName}
          handleGenre={handleGenre}
          handleLanguage={handleLanguage}
          handleSubmitForm={handleSubmitForm}
          handleClick={handleClick}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          classes={classes}
          severity={severity}
        />
      </Jumbotron>
    </Container>
  );
}

export default Upload;
