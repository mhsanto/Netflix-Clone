import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import BackgroundImg from "../assets/StrangerThingsPage.jpg";
import BackgroundImgName from "../assets/strangerThings.png";
import styled from "styled-components";
import { FaPlay, FaInfo } from "react-icons/fa";
import { Container } from "../Styled/GlobalStyle";
const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => setIsScrolled(window.pageYOffset === null);
  };
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
            <Details>
              <h3>Stranger Things</h3>
              <p className="seasons">
                2016 | <span>16+</span>| 4 Seasons | Sci-Fi
              </p>
              <p>
                When a young boy vanishes, a small town uncovers a mystery
                involving secret experiments, terrifying supernatural forces and
                one strange little girl.
              </p>
              <div>
                <div className="flex">
                  <span>Starring: </span>
                  <p>&nbsp; Winona Ryder, David Harbour, Millie Bobby Brown</p>
                </div>
                <div className="flex">
                  <span>Creators:</span>
                  <p> &nbsp;The Duffer Brothers</p>
                </div>
              </div>
            </Details>
            <Play>
              <button>
                <FaPlay />
                Play
              </button>
              <button>
                <FaInfo />
                More Info
              </button>
            </Play>
          </LeftPart>
        </Container>
      </Hero>
    </NetflixSection>
  );
};
const NetflixSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;
`;
const Play = styled.div`
  display: flex;

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
  }
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  z-index: -1;
  img {
    width: 100%;
  }
`;
const Hero = styled.div``;

const Details = styled.div`
  display: grid;
  gap: 1.2rem;
  .seasons {
    font-size: 0.9rem;
    color: #a3a39f;
    margin-top: -3px;
    font-weight: 500;
    letter-spacing: 1px;
  }
  h3 {
    font-size: 1.4rem;
  }
  span {
    color: #a3a39f;
  }
`;
const LeftPart = styled.div`
  position: relative;
  width: 450px;
  display: flex;
  flex-direction: column;
  height: 90vh;
  gap: 4rem;
  justify-content: center;
`;

export default Netflix;
