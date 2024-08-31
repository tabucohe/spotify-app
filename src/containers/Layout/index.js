import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import FirstColumn from "../FirstColumn";
import SecondColumn from "../SecondColumn";
import ThirdColumn from "../ThirdColumn";
import { useStateProvider } from "../../utils/StateProvider";

const Layout = () => {
  const [theme, setTheme] = useState({
    backgroundColor: "#201606",
  });

  const [{ forYouPlaylists, topTracksPlaylist,currentPlaying }, dispatch] = useStateProvider();
;

useEffect(()=>{
  updateTheme(currentPlaying?.accent)
  if(currentPlaying?.accent){

  }
},[currentPlaying])

  const updateTheme = (color) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      backgroundColor: color,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <FirstColumn />
        <SecondColumn />
        <ThirdColumn />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  background-image: linear-gradient(
    108.18deg,
    ${(props) => props.theme.backgroundColor} 2.46%,
    #000000 99.84%
  );
  height: 100vh;
  overflow:hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  font-size: 24px;
  color: #ffff;
`;
