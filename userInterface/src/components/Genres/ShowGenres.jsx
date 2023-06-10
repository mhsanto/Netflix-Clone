import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchMoviesByGenre } from "../../store/store";

const ShowGenres = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(fetchMoviesByGenre({ genres, genre: e.target.value, type }));
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
};
const Select = styled.select`
  background-color: black;
  color: white;
  width: 10rem;
  font-size: 1.5rem;
  margin: 2rem 0;
  border: none;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid;
  &:focus {
    outline: none;
  }
`;
export default ShowGenres;
