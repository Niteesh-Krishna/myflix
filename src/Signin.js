import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./Signin.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Signin(props) {
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { loggedIn, setLoggedIn } = props;
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const USERS = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    const userInfo = USERS.filter((user) => user.email === userEmail);

    if (userInfo.length === 1) {
      if (userInfo[0].email === userEmail) {
        if (userInfo[0].password === userPassword) {
          localStorage.setItem("token", "asdadaklwlkdsfaksdf");
          setLoggedIn(true);
          localStorage.setItem("currentUser", userEmail);
          setSeverity("success");
        } else {
          setSeverity("error"); // Incorrect password
        }
      } else {
        setSeverity("error"); // Incorrect email
      }
    }
    handleClick();
  };

  return !loggedIn ? (
    <Form className="login-form" onSubmit={handleSubmitForm}>
      <h1 className="text-center">
        {" "}
        <span className="font-weight-bold">MyFlix</span>.com
      </h1>
      <h2 className="text-center">Welcome</h2>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Button className="btn-lg btn-dark btn-block" type="submit">
          Log In
        </Button>
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
              {severity === "success"
                ? "Logged In Successfully!"
                : "Incorrect Email or Password!"}
            </Alert>
          </Snackbar>
        </div>
      </FormGroup>
      <div className="text-center">
        <Link to="/register">Sign Up </Link>
      </div>
    </Form>
  ) : (
    <Redirect to="/dashboard" />
  );
}

export default Signin;
