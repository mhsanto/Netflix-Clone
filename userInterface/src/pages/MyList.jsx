import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useNavbarColorChange from "../customHooks/useNavbarColorChange";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utilities/firebase";
import { getUsersLikedMovies } from "../store/store";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "../Styled/GlobalStyle";
import styled from "styled-components";
import Card from "../components/Slider/Card";
const MyList = () => {
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const isScrolled = useNavbarColorChange();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
  });

  useEffect(() => {
    if (email) dispatch(getUsersLikedMovies(email));
  }, [email]);

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <Container>
        <Title>
          <h1>Liked Movies</h1>
        </Title>
        <LikedSection className="flex">
          {movies.map((movie, index) => {
            return (
              <Card
                MovieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </LikedSection>
      </Container>
    </>
  );
};
const Title = styled.div``;
const LikedSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  & > * {
    flex-grow: 1;
    flex-shrink: 1;
  }
`;
export default MyList;
