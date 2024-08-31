import React from 'react';
import styled from 'styled-components';
import useAudioDuration from '../../utils/hooks/useAudioDuration';
import useCoverImage from '../../utils/hooks/useCoverImage';

const SongBanner = ({onClick, songTitle, artistName, songLength, avatarSrc,currentPlaying }) => {
    const { formattedDuration } = useAudioDuration(songLength);

    const { imageUrl, loading, error } = useCoverImage(avatarSrc); 

  return (
    <BannerWrapper onClick={onClick} backgroundColor={currentPlaying?.cover === avatarSrc? "#FFFFFF14" : "transparent"}>
      <Avatar src={imageUrl} alt="Avatar" />
      <SongInfo>
        <SongTitle>{songTitle}</SongTitle>
        <ArtistName>{artistName}</ArtistName>
      </SongInfo>
      <SongLength>{formattedDuration}</SongLength>
    </BannerWrapper>
  );
};

export default SongBanner;

const BannerWrapper = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor:pointer;
  background-color:${(props) => props.backgroundColor} ; 
  border-radius: 8px;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right:auto;
`;

const SongTitle = styled.h3`
  font-size: 15px;
  margin: 0;
  font-weight:400;
  color: #fff;
`;

const ArtistName = styled.p`
  font-size: 13px;
  font-weight:400;
  opacity:0.6;
  color: #fff;
  margin: 0;
`;

const SongLength = styled.span`
  font-size: 14px;
  color: #fff;
  align-self: center; 
  opacity:0.6;
`;
