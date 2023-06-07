import styled from "styled-components";
import StrangerThings from "../assets/STRANGER.mp4";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const VideoPlayer = () => {
  const navigate = useNavigate();
  return (
    <Player>
      <Back>
        <FaArrowLeft onClick={() => navigate(-1)} />
      </Back>
      <Video src={StrangerThings} autoPlay loop muted controls></Video>
    </Player>
  );
};
const Player = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const Video = styled.video`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const Back = styled.div`
  position: absolute;
  z-index: 2;
  top: 2%;
  left: 2%;
  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

export default VideoPlayer;
