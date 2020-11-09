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

const USERS = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

function Register({ history }) {
  const [users, setUsers] = useState(USERS);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log("users", users);

    if (users.filter((user) => user.email === email).length === 1) {
      window.alert("Email Already exists");
    } else {
      const newUser = {
        email: email,
        userName: userName,
        password: password,
        adminAcces: access,
      };
      console.log(newUser);

      setUsers([...users, newUser]);
      history.push("/");
    }
    console.log("users", users);

    setUserName("");
    setEmail("");
    setPassword("");
    setAccess(false);
  };

  return (
    <Form className="login-form" onSubmit={handleSubmitForm}>
      <h1 className="text-center">
        {" "}
        <span className="font-weight-bold">MyFlix</span>.com
      </h1>
      <h2 className="text-center">Register</h2>

      <FormGroup>
        <Label>Username</Label>
        <Input
          required
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        {" "}
        <Label>Password</Label>
        <Input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={access}
            onChange={(e) => setAccess(e.target.checked)}
          />{" "}
          Admin Access
        </Label>
      </FormGroup>
      <FormGroup>
        <Button className="btn-lg btn-dark btn-block" type="submit">
          Register
        </Button>
      </FormGroup>
      <FormGroup>
        <div className="text-center">
          <Link to="/">Log In </Link>
        </div>
      </FormGroup>
    </Form>
  );
}

export default Register;
