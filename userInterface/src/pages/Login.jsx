import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/HeroSection/Background";
import Logo from "../assets/netflixLogo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utilities/firebase";
const Login = () => {
  const text = `The information collected by Google reCAPTCHA is subject to
  the Google Privacy Policy and Terms of Service, and is used
  for providing, maintaining, and improving the reCAPTCHA
  service and for general security purposes (it is not used for
  personalized advertising by Google)`;
  /* Declaring two state variables using the `useState` hook. */
  const [showMore, setShowMore] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showWarning, setShowWarning] = useState({
    email: "Please enter a valid email or phone number",
    password: " Your password must contain between 4 and 60 characters.",
  });
  /* `const navigate = useNavigate();` is using the `useNavigate` hook from the `react-router-dom`
   */
  const HandleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleLogin = async () => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <>
      <Link to="/">
        <Img src={Logo} alt="Netflix Logo" />
      </Link>
      <Background />
      <LoginSection>
        <MainContainer>
          <h1>Sign In</h1>
          <Form onSubmit={(e) => e.preventDefault()}>
            <EmailSection>
              <input
                onBlur={() => setShowEmailWarning(true)}
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email or phone number"
              />
              {email.length < 5 && showEmailWarning && (
                <span>{showWarning.email}</span>
              )}
            </EmailSection>
            <Password>
              <input
                onBlur={() => setShowPasswordWarning(true)}
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="password"
                placeholder="Password"
              />
              {password.length < 6 && showPasswordWarning && (
                <span>{showWarning.password}</span>
              )}
            </Password>
            <Button onClick={handleLogin}>Sign In</Button>
            <CheckBox>
              <div>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </CheckBox>

            <Rows>
              <Col_1>
                <span>New to Netflix?</span>
                <Link to="/signup">Sign up now.</Link>
              </Col_1>
            </Rows>
            <Rows>
              <Col_2>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
                {showMore ? (
                  <span
                    onClick={HandleShowMore}
                    style={{
                      color: "#0071EB",
                      cursor: "pointer",
                    }}
                  >
                    Learn more.
                  </span>
                ) : (
                  <>
                    <p style={{ marginTop: ".7rem", fontSize: ".8rem" }}>
                      {text}
                    </p>
                  </>
                )}
              </Col_2>
            </Rows>
          </Form>
        </MainContainer>
      </LoginSection>
    </>
  );
};
const LoginSection = styled.section`
  display: grid;
  place-content: center;
  height: 100vh;
`;
const MainContainer = styled.main`
  background-color: rgba(0, 0, 0, 0.75);
  display: grid;
  place-content: center;
  padding: 0 5rem;
  width: 450px;
  height: 640px;
  border-radius: 3px;
  position: relative;
  z-index: 20;
  h1 {
    margin-bottom: 1.5rem;
    font-size: 35px;
    font-weight: 600;
    font-family: sans-serif;
  }
`;

const Rows = styled.div`
  display: flex;
  color: rgba(255, 255, 255, 0.5);
`;
const Password = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  color: #e87c03;
  span {
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #e87c03;
  span {
    font-size: 0.85rem;
    font-weight: 500;
  }
`;
const Img = styled.img`
  max-width: 180px;
  top: 3%;
  left: 3%;
  position: absolute;
  z-index: 5;
`;
const Col_1 = styled.div`
  a {
    color: white;
    text-decoration: none;
    padding: 0 0 0 0.15rem;
  }
`;
const Col_2 = styled.div`
  font-size: 0.85rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 312px;
  input {
    padding: 1rem 1.5rem;
    background: rgb(51, 51, 51);
    border-radius: 6px;
    border: none;
    margin-right: 8px;
    color: white;
    font-size: large;
    outline: none;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-weight: 500;
      font-size: 0.95rem;
    }
    &::-moz-focus-outer {
      outline: none;
      border-bottom: 2px solid orange;
    }
    &:focus {
      outline: none;
      border-bottom: 2px solid orange;
    }
  }
`;
const Button = styled.button`
  background-color: var(--primary-color);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color, white);
  padding: 1rem;
  width: 312px;
  border: none;
  border-radius: 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const CheckBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);

  p {
    padding: 0 1rem;
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default Login;
