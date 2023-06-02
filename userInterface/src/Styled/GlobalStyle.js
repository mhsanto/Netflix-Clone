import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
:root{
    --primary-color:#E50914;
    --bg-color:#000;
    --text-color:#fff;
    --primary-font:'Noto Sans', sans-serif;
}
  *,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
   
  }
  body::-webkit-scrollbar{
    display: none;
  }
  body{
      position: relative;
      background-color: var(--bg-color,black);
      font-family: var(--primary-font);
      color: var(--text-color);
      overflow-x: hidden ;
    }
    img{
      max-width: 100%;
      object-fit: cover;
    }
    button{
      cursor: pointer;
    }
`;
export const Container = styled.div`
  padding: 0 4rem;
  margin-inline: auto;
  position: relative;
  z-index: 1000;
`;
