import styled from "styled-components";

import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Container } from "../../Styled/GlobalStyle";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { firebaseAuth } from "../../utilities/firebase";

const navLinks = [
  { name: "Home", link: "/", active: "active" },
  { name: "TV shows", link: "/shows" },
  { name: "Movies", link: "/movies" },
  { name: "My list", link: "/mylist" },
];

// eslint-disable-next-line react/prop-types
const Navbar = ({ isScrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [hoverInput, setHoverInput] = useState(false);
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  return (
    <Nav isScrolled={isScrolled} className="">
      <Container className={`${isScrolled ? "scroll" : ""} container`}>
        <LogoSection>
          <Link to="/">
            <Img src={Logo} alt="Netflix Logo" />
          </Link>
          <Ul>
            {navLinks.map(({ name, link, active }) => (
              <Link key={name} className={active} to={link}>
                {name}
              </Link>
            ))}
          </Ul>
        </LogoSection>
        <Search>
          <div className={`flex ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!hoverInput) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              className="searchBar"
              type="text"
              name="search"
              placeholder="Titles,people,genre"
              onMouseEnter={() => setHoverInput(true)}
              onMouseLeave={() => setHoverInput(false)}
              onBlur={() => {
                setHoverInput(false);
                setShowSearch(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <MdOutlineLogout />
          </button>
        </Search>
      </Container>
    </Nav>
  );
};

const Nav = styled.nav`
  position: sticky;
  z-index: 10000;
  top: 0;
  .scroll {
    width: 100%;
    height: 4rem;
    background-color: black;
    top: 0;
    position: fixed;
    z-index: 10000;
    @media (max-width: 1200px) {
      height: 3rem;
      position: static;
    }
  }
  .container {
    display: flex;
    justify-content: space-between;
    padding-top: 0.8rem;
    flex-wrap: nowrap;
    @media (max-width: 960px) {
      padding-top: 0.2rem;
    }
  }
`;
const LogoSection = styled.div`
  display: flex;
  padding-top: 0.8rem;
`;
const Img = styled.img`
  width: 7.5rem;
  z-index: 50;
  @media (max-width: 960px) {
    width: clamp(2rem, 5rem, 5.9rem);
  }
`;
const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  .flex {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    padding-left: 0.5rem;
    button {
      background-color: transparent;
      border: none;
      &:focus {
        outline: none;
      }
      svg {
        color: white;
        font-size: 1.3rem;
        &:focus {
          background-color: red;
        }
        @media (max-width: 960px) {
          font-size: 1rem;
        }
      }
    }
  }
  button {
    background-color: transparent;
    border: none;

    &:focus {
      outline: none;
    }
    svg {
      color: white;
      font-size: 1.3rem;

      @media (max-width: 960px) {
        font-size: 1rem;
      }
    }
  }
  input {
    width: 0;
    border: 0;
    outline: 0;
    opacity: 0;
    visibility: hidden;
    transition: width 0.3s ease;
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
      width: 0;
      border: 0;
      outline: 0;
      opacity: 0;
    }
  }
  .show-search {
    border: 1px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    input {
      color: white;
      width: 100%;
      visibility: visible;
      padding: 0.3rem;
      opacity: 1;
    }
  }
`;
const Ul = styled.ul`
  display: flex;
  margin-left: 2rem;
  flex-wrap: nowrap;
  @media (max-width: 960px) {
    margin-left: 1rem;
  }
  @media (max-width: 460px) {
    margin-left: 0.5rem;
  }
  a {
    flex-shrink: 0;
    text-transform: capitalize;
    color: #b8b7b5;
    margin-right: 1rem;
    font-size: 0.95rem;
    font-weight: 600;
    @media (max-width: 960px) {
      font-size: clamp(0.6rem, 1vw, 0.8rem);
    }
    @media (max-width: 480px) {
      margin-right: 0.5rem;
    }
  }
  .active {
    color: white;
  }
`;

export default Navbar;
