import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import video from "../../assets/John.MP4";
import {
  AiOutlineLike,
  AiFillPlayCircle,
  AiOutlinePlus,
  AiFillLike,
  AiFillDislike,
  AiOutlineCheck,
  AiOutlineDislike,
} from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utilities/firebase";
const Card = ({ MovieData, alt, title, isLiked }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    currentUser ? setEmail(currentUser.email) : navigate("/login");
  });
  let timeoutID;
  const delayOnHover = () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      setShowPlayer(true);
    }, 350);
  };
  const clearDelayHover = () => {
    clearTimeout(timeoutID);
    setShowPlayer(false);
  };
  const addToList = async () => {
    try {
      await axios.post("http://localhost:3001/api/user/add", {
        email,
        data: MovieData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      onMouseEnter={delayOnHover}
      onMouseLeave={clearDelayHover}
      showPlayer={showPlayer}
    >
      <img
        className="image"
        src={`https://image.tmdb.org/t/p/w500${MovieData.image}`}
        alt={alt}
        onClick={() => navigate("/player")}
      />

      {showPlayer && (
        <ShowPlayer>
          <HoverImageVideo className="hover">
            <video
              className="video"
              src={video}
              alt={alt}
              autoPlay
              muted
              onClick={() => navigate("/player")}
              loop
            />

            <div className="info">
              <h2>{alt}</h2>
              <Icons>
                <AiFillPlayCircle onClick={() => navigate("/player")} />
                <div>
                  {!like ? (
                    <AiOutlineLike
                      onClick={() => {
                        setLike(true);
                        setDislike(false);
                      }}
                    />
                  ) : (
                    <AiFillLike onClick={() => setLike(false)} />
                  )}
                  {!dislike ? (
                    <BiDislike
                      onClick={() => {
                        setLike(false);
                        setDislike(true);
                      }}
                    />
                  ) : (
                    <AiFillDislike onClick={() => setDislike(false)} />
                  )}
                </div>
                {isLiked && (
                  <AiOutlineCheck title="Add to my list" onClick={addToList} />
                )}
                {!isLiked && (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </Icons>
              <div className="flex" style={{ padding: "0 0 1rem 1rem" }}>
                {MovieData.genres.map((genre, i) => (
                  <p key={i}>|&nbsp;{genre}&nbsp;</p>
                ))}
              </div>
            </div>
          </HoverImageVideo>
        </ShowPlayer>
      )}
    </Container>
  );
};
const Icons = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(0.9rem, 1.3rem, 1.4rem);

  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
  & > * {
    cursor: pointer;
  }
  div {
    display: flex;
    gap: 0.3rem;
  }
`;
const ShowPlayer = styled.div`
  position: relative;
  .info h2 {
    font-size: clamp(0.9rem, 1.3rem, 1.4rem);
    padding: 0 1rem;
    @media (max-width: 640px) {
    }
  }
`;
const HoverImageVideo = styled.div`
  bottom: 10vh;
  position: absolute;
  width: 20rem;
  border-radius: 0.4rem;
  transition: all 0.3s;
  box-shadow: 0px 5px 13px rgba(0, 0, 0, 0.5);
  z-index: 50;
  transition: 5s;
  background-color: rgba(252, 0, 0, 0.8);
  @media (max-width: 640px) {
    width: 180px;
  }
  .hoverImage {
    width: 100%;
    cursor: pointer;
  }
  .video {
    cursor: pointer;
    width: 100%;
  }
`;
const Container = styled.div`
  position: relative;
  .image {
    width: 220px;
    object-fit: cover;
    cursor: pointer;
    &:hover {
      opacity: ${({ showPlayer }) => (showPlayer === true ? 0.2 : 1)};
    }
    @media (max-width: 640px) {
      width: 180px;
    }
  }
`;
export default React.memo(Card);
