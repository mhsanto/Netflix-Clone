import Header from "../components/HeroSection/Header";
import Background from "../components/HeroSection/Background";

// style component
import { Container } from "../Styled/GlobalStyle";
import Main from "../components/HeroSection/Main";
const Signup = () => {
  return (
    <>
      <Background />
      <Container>
        <Header login />
        <Main />
      </Container>
    </>
  );
};

export default Signup;
