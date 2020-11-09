import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, movies, ...rest }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const { setLoggedIn } = rest;

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const { loggedIn } = rest;

  return loggedIn ? (
    <Route
      {...rest}
      render={(props) => <Component {...props} {...rest} movies={movies} />}
    />
  ) : (
    <Redirect to="/" />
  );
}

export default PrivateRoute;
