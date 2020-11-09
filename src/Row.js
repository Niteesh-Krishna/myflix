import React, { useEffect } from "react";
import { Rate, Button } from "antd";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import "./Row.css";

import ReactTimeAgo from "react-time-ago";

const useStyles = makeStyles({
  ratingButton: {
    border: `none`,
    padding: 0,
    color: `rgb(255,255,255)`,
    background: "#111",
    marginRight: 5,
  },
  editRating: {
    border: `none`,
    color: `rgb(255,255,255)`,
    background: "#111",
    padding: 0,
    marginRight: 5,
  },
  userRating: {
    marginLeft: 7,
  },
});

const MOVIES = localStorage.getItem("movies")
  ? JSON.parse(localStorage.getItem("movies"))
  : [];
const currentUser = localStorage.getItem("currentUser");

function Row({ title, movies, genre }) {
  const classes = useStyles();
  // const [allMovies, setAllMovies] = React.useState(MOVIES);
  const [open, setOpen] = React.useState(false);
  const [hover, sethover] = React.useState(false);
  const [userRating, setUserRating] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  // useEffect(() => {
  //   localStorage.setItem("movies", JSON.stringify(allMovies));
  // }, [allMovies]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRateInput = (value) => {
    setUserRating(value);
  };

  const handleOnMouseOver = (e, index) => {
    setActiveIndex(index);
    sethover(true);
  };

  const handleOnMouseOut = (e, index) => {
    setActiveIndex(index);
    sethover(false);
  };

  const getCurrentUserRating = (movie) => {
    const ratingObject = movie.ratedBy.find(
      (item) => item.user === currentUser
    );
    if (ratingObject) {
      return ratingObject.rating;
    } else {
      return 0;
    }
  };

  const onSubmit = (e, id) => {
    handleClose();

    MOVIES.forEach((movie) => {
      if (movie.id === id) {
        let ratedBy = movie.ratedBy;
        let presence = ratedBy.find((item) => item.user === currentUser);
        if (presence === undefined) {
          movie.ratedBy.push({ user: currentUser, rating: userRating });

          var newRating =
            (movie.rating * movie.totalRatings + userRating) /
            (movie.totalRatings + 1);
          movie.rating = Math.round(newRating);
          movie.totalRatings = movie.totalRatings + 1;
        } else {
          ratedBy.forEach((item) => {
            if (item.user === currentUser) {
              let prevUserRating = item.rating;
              item.rating = userRating;

              let sum = movie.rating * movie.totalRatings - prevUserRating;

              let newAverage = (sum + userRating) / movie.totalRatings;

              movie.rating = Math.round(newAverage);
            }
          });
        }
      }
    });
    localStorage.setItem("movies", JSON.stringify(MOVIES));
  };

  return (
    <div className="listing_container">
      <h2 className="row_title"> {title} </h2>
      {movies.length === 0 && (
        <div className="moviePlaceholder"> Oops! No movies yet..</div>
      )}
      <div className={`row ${genre && "row_posters_genre"}`}>
        <div className="row_posters">
          {movies.map((movie, index) => (
            <div className={"row_poster"}>
              <img
                className="image"
                key={movie.id}
                src={movie.thumbnail}
                alt={movie.name}
              />
              <div className="movieName">
                {" "}
                {movie.name}
                <br />
                <Rate
                  className="rating"
                  key={movie.id}
                  value={movie.rating}
                  disabled
                />
                ({movie.totalRatings})
                <div>
                  <Button
                    key={movie.id}
                    onMouseOver={(e) => handleOnMouseOver(e, index)}
                    onMouseOut={(e) => handleOnMouseOut(e, index)}
                    color="primary"
                    onClick={handleClickOpen}
                    className={`${
                      index === activeIndex
                        ? classes.editRating
                        : classes.ratingButton
                    }`}
                  >
                    {hover && index === activeIndex
                      ? "Edit Rating"
                      : "Your Rating"}
                  </Button>
                  <span className="userRating">
                    {" "}
                    {getCurrentUserRating(movie)}
                  </span>
                  <div className="movieDate">
                    <ReactTimeAgo
                      date={movie.date}
                      locale="en-US"
                      timeStyle="round-minute"
                    />
                  </div>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Rating</DialogTitle>
                    <DialogContent>
                      <Rate
                        defaultValue={2.5}
                        value={userRating}
                        onChange={handleRateInput}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={(e) => onSubmit(e, movie.id)}
                        color="primary"
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
