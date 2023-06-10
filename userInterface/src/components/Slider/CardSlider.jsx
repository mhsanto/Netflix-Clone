import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { Container } from "../../Styled/GlobalStyle";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CardSlider = ({ title, MovieSlice }) => {
  const [showControl, setShowControl] = useState(false);
  const [slidePosition, setSlidePosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    console.log(direction);
    if (direction === "left" && slidePosition > 0) {
      listRef.current.style.transform = `translateX( ${260 + distance}px)`;
      setSlidePosition((prev) => prev - 1);
      console.log(slidePosition);
    }
    if (direction === "right" && slidePosition < 9) {
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
      setSlidePosition((prev) => prev + 1);
      console.log(slidePosition);
    }
  };
  return (
    <Container
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
    >
      <Flex>
        <h2>{title}</h2>
        <div className="wrapper">
          <div className={`slider-action left ${showControl ? "" : "none"}`}>
            <AiOutlineLeft onClick={() => handleDirection("left")} />
          </div>
          <div className="flex gap slider" ref={listRef}>
            {MovieSlice.map((movie, index) => (
              <Card
                MovieData={movie}
                index={index}
                key={movie.id}
                alt={movie.name}
              />
            ))}
          </div>
          <div className={`slider-action right ${showControl ? "" : "none"}`}>
            <AiOutlineRight onClick={() => handleDirection("right")} />
          </div>
        </div>
      </Flex>
    </Container>
  );
};
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    font-style: italic;
  }
  .gap {
    gap: 1rem;
  }
  .slider-action {
    position: absolute;
    z-index: 999;
    top: 50%;
    bottom: 0;
    transition: 3ms;
    svg {
      font-size: 2rem;
      cursor: pointer;
    }
  }
  .slider {
    width: max-content;
    gap: 1rem;
    transform: translateX(0px);
    transition: 0.3s ease-in-out;
  }
  .none {
    display: none;
  }
  .left {
    left: 2%;
  }
  .right {
    right: 2%;
  }
`;
export default React.memo(CardSlider);
