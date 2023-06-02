import styled from "styled-components";
import "./inputStyle.css";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
const Main = () => {
  /* Declaring two state variables using the `useState` hook. */

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  /* `const navigate = useNavigate();` is using the `useNavigate` hook from the `react-router-dom`
   */
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        inputValues.email,
        inputValues.password
      );
    } catch (error) {
      console.log(error);
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  return (
    <MainContainer showPassword={showPassword}>
      <h1>Unlimited movies, TV shows, and more</h1>
      <h4>Plans now start at USD2.99/month.</h4>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <Form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={inputValues.email}
          onChange={(e) =>
            setInputValues({ ...inputValues, [e.target.name]: e.target.value })
          }
        />
        {showPassword && (
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputValues.password}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                [e.target.name]: e.target.value,
              })
            }
          />
        )}
        {!showPassword && (
          <Button type="button" onClick={() => setShowPassword(true)}>
            Get Started <MdArrowForwardIos />
          </Button>
        )}
      </Form>
      <LoginOut onClick={handleLogin}>Login</LoginOut>
    </MainContainer>
  );
};
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h1 {
    font-size: 48px;
    font-weight: 700;
  }
  h4 {
    font-size: 24px;

    text-align: center;
  }
  p {
    font-size: 20px;
    text-align: center;
  }
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: ${({ showPassword }) =>
    !showPassword ? "2fr 1fr" : " 1fr 1fr"};
  text-align: center;
  width: 70%;

  input {
    padding: 1.2rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-right: 8px;
    color: white;
    font-size: large;
    &::placeholder {
      color: rgba(255, 255, 255, 0.65);
      font-weight: 500;
      font-size: 1rem;
    }
  }
`;
const Button = styled.button`
  background-color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color, white);
  border: none;
  border-radius: 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const LoginOut = styled.button`
  padding: 0.6rem 2rem;
  background-color: var(--primary-color);
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
`;

export default Main;
