import BackgroundIMG from "../../assets/bg.jpg";
import styled from "styled-components";

const Background = () => {
  return (
    <ImageContainer>
      <Image src={BackgroundIMG} alt="background" />
    </ImageContainer>
  );
};
const ImageContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;
const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
`;
export default Background;
