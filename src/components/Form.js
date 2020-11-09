import React from "react";

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button,
} from "reactstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Form({
  name,
  genre,
  language,
  handleName,
  handleGenre,
  handleLanguage,
  handleSubmitForm,
  handleClick,
  handleClose,
  open,
  setOpen,
  classes,
  severity,
}) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <BTForm style={{ marginLeft: 270 }} onSubmit={handleSubmitForm}>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={2}>
          Movie
        </Label>
        <Col sm={4}>
          <Input
            type="text"
            name="name"
            id="movieName"
            placeholder="Titanic"
            value={name}
            onChange={handleName}
          />
        </Col>
      </FormGroup>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={2}>
          Genre
        </Label>
        <Col sm={4}>
          <Input
            type="text"
            name="Genre"
            id="movieGenre"
            placeholder="Fiction"
            value={genre}
            onChange={handleGenre}
          />
        </Col>
      </FormGroup>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={2}>
          Language
        </Label>
        <Col sm={4}>
          <Input
            type="text"
            name="Language"
            id="movieLanguage"
            placeholder="English"
            value={language}
            onChange={handleLanguage}
          />
        </Col>
      </FormGroup>

      <Button type="submit" color="primary" style={{ marginLeft: -250 }}>
        Add
      </Button>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {severity === "success"
              ? "Movie Added Successfully!"
              : "Invalid Movie Details"}
          </Alert>
        </Snackbar>
      </div>
    </BTForm>
  );
}

export default Form;
