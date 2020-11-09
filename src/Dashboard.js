import React, { useState, useEffect } from "react";

import NavigationBar from "./NavigationBar";

import Row from "./Row";
import "./Nav.css";

function Dashboard({ movies, history, setLoggedIn, setUploadAcc }) {
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const getUnique = (arr, comp) => {
    const unique = arr

      .map((e) => e[comp])

      .map((e, i, final) => final.indexOf(e) === i && i)

      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  };

  const uniqueGenre = getUnique(movies, "genre");
  const uniqueLanguage = getUnique(movies, "language");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [sortOption, setSortOption] = useState("");

  const sortableOptions = ["Rating", "What's new"];

  const shouldAllMoviesRender = !genre && !language && !sortOption;

  let filterDropdown = movies.filter(function (result) {
    return genre && !language
      ? result.genre === genre
      : !genre && language
      ? result.language === language
      : genre && language
      ? result.genre === genre && result.language === language
      : result;
  });

  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleRateInput = (event, id) => {
    setRating(event);
  };

  const handleRating = (index) => {
    movies.forEach((movie) => {
      if (movie.id === index) {
        if (movie.rating === 0) {
          movie.rating = rating;
          movie.totalRatings = 1;
        } else {
          var newRating =
            (movie.rating * movie.totalRatings + rating) /
            (movie.totalRatings + 1);
          movie.rating = newRating;
          movie.totalRatings = movie.totalRatings + 1;
        }
      }
    });

    localStorage.setItem("movies", JSON.stringify(movies));
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const sortByRating = (data) => {
    filterDropdown = data.sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
  };

  const sortByDate = (data) => {
    filterDropdown = data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  return (
    <div className="dashboard">
      <NavigationBar
        history={history}
        genre={genre}
        setGenre={setGenre}
        handleGenre={handleGenre}
        language={language}
        setLanguage={setLanguage}
        handleLanguage={handleLanguage}
        sortableOptions={sortableOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
        handleSort={handleSort}
        uniqueGenres={uniqueGenre}
        uniqueLanguages={uniqueLanguage}
        setLoggedIn={setLoggedIn}
        setUploadAcc={setUploadAcc}
      />

      {shouldAllMoviesRender && (
        <div>
          {" "}
          {uniqueGenre.map((uniqueGenreMovie) => {
            const sameGenredMovies = movies.filter((movie) => {
              return uniqueGenreMovie.genre === movie.genre;
            });

            return (
              <Row
                key={uniqueGenreMovie.id}
                title={uniqueGenreMovie.genre}
                movies={sameGenredMovies}
              />
            );
          })}
        </div>
      )}

      {sortOption === "Rating"
        ? sortByRating(filterDropdown)
        : sortOption === "What's New"
        ? sortByDate(filterDropdown)
        : ""}

      <Row key="filter" title={genre} movies={filterDropdown} genre={genre} />
    </div>
  );
}

export default Dashboard;
