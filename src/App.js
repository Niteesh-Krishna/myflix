import React, { useState, useEffect } from "react";

import SignIn from "./Signin";
import Register from "./Register";
import UploadRoute from "./UploadRoute";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "./Dashboard";
import Upload from "./Upload";

import { Switch, Route } from "react-router-dom";

const MOVIES = localStorage.getItem("movies")
  ? JSON.parse(localStorage.getItem("movies"))
  : [];

function App() {
  const [movies, setMovies] = useState(MOVIES);

  const [loggedIn, setLoggedIn] = useState(false);
  const [uploadAcc, setUploadAcc] = useState(null);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          )}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />

        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          movies={movies}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          uploadAcc={uploadAcc}
          setUploadAcc={setUploadAcc}
        />
        <UploadRoute
          exact
          path="/upload"
          component={Upload}
          loggedIn={loggedIn}
          uploadAcc={uploadAcc}
          setUploadAcc={setUploadAcc}
          movies={movies}
          setMovies={setMovies}
        ></UploadRoute>
      </Switch>
    </div>
  );
}

export default App;

// https://www.freecodecamp.org/news/react-router-tutorial/
