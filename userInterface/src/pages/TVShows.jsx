import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGenre, fetchMovies } from "../store/store";
import styled from "styled-components";
import Slider from "../components/Slider/Slider";
import ShowGenres from "../components/Genres/ShowGenres";
import { Container } from "../Styled/GlobalStyle";
import useNavbarColorChange from "../customHooks/useNavbarColorChange";

const Movies = () => {
  const isScrolled = useNavbarColorChange();
  const genresLoaded = useSelector((state) => state.netflix.loadGenres);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGenre());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "tv" }));
  }, [genresLoaded]);

  return (
    <div>
      <Navbar isScrolled={isScrolled} />

      <Container>
        <ShowGenres genres={genres} type="tv" />
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
