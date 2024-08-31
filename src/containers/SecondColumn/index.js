import React, { useState } from "react";
import styled from "styled-components";
import TabHeadings from "../../components/TabHeadings";
import { FOR_YOU, TOP_TRACKS } from "../../utils/constants/constants";
import SearchBox from "../../components/SearchBox";
import SongBanner from "../../components/SongBanner";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/ConstantTypes";



const SecondColumn = () => {
  const [{ forYouPlaylists, topTracksPlaylist,currentPlaying }, dispatch] = useStateProvider();
  const [ActiveTitle, setActiveTitle] = useState(FOR_YOU);
  const [Playlists, setPlaylist] = useState(forYouPlaylists)
  
  const toggleTab = (title) => {
    if(title === FOR_YOU){
      setPlaylist(forYouPlaylists)
    } else {
      setPlaylist(topTracksPlaylist)
    }
    setActiveTitle(title);
  };

  const handleSongClick = ( record) => {

    
    dispatch({
      type: reducerCases.SET_SONG_URL,
      songUrl: record.url,
    });
    dispatch({
      type: reducerCases.SET_COVER_ID,
      coverId: record.cover,
    });
    dispatch({
      type: reducerCases.SET_PLAYING,
      currentPlaying: record,
    });
  }

  return (
    <Container>
      <FlexWrapper>
        <TabHeadings
          title={FOR_YOU}
          isActive={ActiveTitle === FOR_YOU}
          onClick={toggleTab}
        />
        <TabHeadings
          title={TOP_TRACKS}
          isActive={ActiveTitle === TOP_TRACKS}
          onClick={toggleTab}
        />
      </FlexWrapper>
      <SearchBox />
      <SongListWrapper>
        {Playlists?.map((record) => (
          <SongBanner
          onClick={()=>handleSongClick(record)}
            key={record}
            artistName={record?.artist}
            avatarSrc={record?.cover}
            songTitle={record?.name}
            songLength={record?.url}
            currentPlaying={currentPlaying}
          />
        ))}
      </SongListWrapper>
    </Container>
  );
};

export default SecondColumn;

const Container = styled.div`
  width: 35%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;


const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const SongListWrapper = styled.div`
  display: flex;
  flex-direction: column;


  gap: 10px;
  white-space: nowrap;

 
`;
