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
      overflow-x: hidden !important ;
    }
   
    button{
      cursor: pointer;
    }
    a{
      text-decoration: none;
    }
    ul,li{
      list-style: none;
    }
    .flex{
      display: flex;
    }
    .flex-direction{

      flex-direction: column;
    }
`;
export const Container = styled.div`
  padding: 0 4rem;
  margin-inline: auto;
  position: relative;
  z-index: 10;
  @media (max-width: 960px) {
    padding: 0 2rem;
  }
  @media (max-width: 480px) {
    padding: 0 0.8rem;
  }
`;
