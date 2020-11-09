import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const USERS = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

function UploadRoute({ component: Component, movies, setMovies, ...rest }) {
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userObj = USERS.find((obj) => obj.email === currentUser);
      const { setUploadAcc } = rest;

      if (userObj) {
        if (userObj.adminAcces === true) {
          setUploadAcc(true);
        } else {
          setUploadAcc(false);
        }
      }
    }
  }, []);

  const { uploadAcc } = rest;

  return uploadAcc !== null ? (
    uploadAcc ? (
      <Route
        {...rest}
        render={(props) => (
          <Component
            {...props}
            {...rest}
            movies={movies}
            setMovies={setMovies}
          />
        )}
      />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <div></div>
  );
}

export default UploadRoute;
