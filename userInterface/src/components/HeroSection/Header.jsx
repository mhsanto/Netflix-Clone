import styled from "styled-components";
import NetflixLogo from "../../assets/netflixlogo.png";
import { Container } from "../../Styled/GlobalStyle";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderSection>
        <Logo>
          <img src={NetflixLogo} alt="" />
        </Logo>
        <Login onClick={() => navigate(props.login ? "/login" : "/signup")}>
          {props.login ? "Login" : "Sign In"}
        </Login>
      </HeaderSection>
    </Container>
  );
};
// -----styling------
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 5;
  padding-top: 25px;
`;
const Login = styled.button`
  height: 2.2rem;
  padding: 0 1rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  font-weight: 600;
  border-radius: 6px;
  border: none;
  /* margin-top: 25px; */
  cursor: pointer;
`;
const Logo = styled.div`
  img {
    max-width: 9.3125rem;
    object-fit: cover;
  }
`;
export default Header;
