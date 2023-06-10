import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGenre, fetchMovies } from "../store/store";
import styled from "styled-components";
import Slider from "../components/Slider/Slider";
import ShowGenres from "../components/Genres/ShowGenres";
import { Container } from "../Styled/GlobalStyle";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const genresLoaded = useSelector((state) => state.netflix.loadGenres);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGenre());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "movie" }));
  }, [genresLoaded]);

  // change navbar color when scrolled
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => setIsScrolled(window.scrollY === null);
  };
  return (
    <div>
      <Navbar isScrolled={isScrolled} />

      <Container>
        <ShowGenres genres={genres} type="movie" />
      </Container>
      <MoviesSection>
        {movies.length ? (
          <Slider movies={movies} />
        ) : (
          <h1> Movies Not Found </h1>
        )}
      </MoviesSection>
    </div>
  );
};
const MoviesSection = styled.section``;
export default Movies;
