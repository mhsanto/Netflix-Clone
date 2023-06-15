// internal imports
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// components
import Navbar from "../components/Navbar/Navbar";
import BackgroundImg from "../assets/StrangerThingsPage.jpg";
import BackgroundImgName from "../assets/strangerThings.png";
import { FaPlay, FaInfo } from "react-icons/fa";
import { Container } from "../Styled/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { fetchGenre, fetchMovies } from "../store/store";
import Slider from "../components/Slider/Slider";
import useNavbarColorChange from "../customHooks/useNavbarColorChange";

const Netflix = () => {
  const [moreInfo, setMoreInfo] = useState(false);
  const isScrolled = useNavbarColorChange();
  const genresLoaded = useSelector((state) => state.netflix.loadGenres);
  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const genres = useSelector((state) => state.netflix.genres);
  useEffect(() => {
    dispatch(fetchGenre());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "all" }));
  }, [genresLoaded]);

  // change navbar color when scrolled

  return (
    <NetflixSection>
      <Navbar isScrolled={isScrolled} />
      <Hero>
        <Background>
          <img src={BackgroundImg} alt="background Image" />
        </Background>
        <Container>
          <LeftPart>
            <img src={BackgroundImgName} alt="Stranger Things" />
            <Details moreInfo={moreInfo}>
              <h3>Stranger Things</h3>
              <p className="seasons">
                2016 | <span>16+</span>| 4 Seasons | Sci-Fi
              </p>
              <Para>
                When a young boy vanishes, a small town uncovers a mystery
                involving secret experiments, terrifying supernatural forces and
                one strange little girl.
              </Para>
              <div>
                {moreInfo ? (
                  <>
                    <div className="flex none">
                      <span>Starring: </span>
                      <Para2>
                        &nbsp; Winona Ryder, David Harbour, Millie Bobby Brown
                      </Para2>
                    </div>
                    <div className="flex none">
                      <span>Creators:</span>
                      <Para2> &nbsp;The Duffer Brothers</Para2>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Details>
            <Play>
              <button onClick={() => navigate("/player")}>
                <FaPlay />
                Play
              </button>
              <button onClick={() => setMoreInfo(!moreInfo)}>
                <FaInfo />
                More Info
              </button>
            </Play>
          </LeftPart>
        </Container>
      </Hero>
      <Slider movies={movies} />
    </NetflixSection>
  );
};
const NetflixSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
`;
const Play = styled.div`
  display: flex;
  padding-bottom: 2rem;
  padding-top: 1rem;
  button {
    display: flex;
    margin-right: 1rem;
    padding: 0.7rem 1.4rem;
    gap: 0.5rem;

    font-size: large;
    background-color: white;
    border: none;
    border-radius: 3px;
    font-weight: 500;
    transition: 0.4s;
    &:hover {
      opacity: 0.8;
    }
    &:nth-child(2) {
      background-color: rgba(255, 255, 255, 0.3);
      color: white;
    }
    @media (max-width: 1200px) {
      font-size: 0.9rem;
      padding: 0.5rem 0.9rem;
    }
  }
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 80%;
  max-height: max-content;
  background: #000;
  z-index: -1;
  overflow-x: hidden;
  @media (max-width: 480px) {
    max-width: 100%;
  }
  @media (max-width: 640px) {
    max-width: 100%;
  }
  img {
    width: 100%;
    height: max-content;
    @media (max-width: 960px) {
      width: 100vw;
      object-fit: cover;
    }
    @media (max-width: 680px) {
      width: 100vw;
      height: 90vh;

      object-fit: cover;
    }
  }
  @media (max-width: 480px) {
    top: 5%;
  }
`;
const Hero = styled.div`
  height: max-content;
  padding-top: 4.5rem;

  @media (max-width: 960px) {
    padding-top: 2rem;
  }
`;
const Para = styled.p`
  @media (max-width: 960px) {
    font-size: 0.89rem;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .seasons {
    font-size: 0.9rem;
    color: #a3a39f;
    margin-top: -3px;
    font-weight: 500;
    letter-spacing: 1px;
  }
  h3 {
    font-size: 1.4rem;
    @media (max-width: 960px) {
      font-size: 1.2rem;
    }
  }

  span {
    color: #a3a39f;
    @media (max-width: 960px) {
      font-size: 0.8rem;
    }
  }
`;
const Para2 = styled.p``;
const LeftPart = styled.div`
  position: relative;
  width: 28.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  img {
    padding-bottom: 2rem;
    @media (max-width: 960px) {
      padding-bottom: 0.5rem;
      width: clamp(12rem, 19rem, 20rem);
      gap: 1.5rem;
    }
  }
  @media (max-width: 960px) {
    padding-top: 1rem;
    width: clamp(5rem, 19rem, 20rem);
    gap: 1.5rem;
  }
  @media (max-width: 480px) {
    padding-top: 1rem;
    gap: 0em;
  }
`;

export default Netflix;
