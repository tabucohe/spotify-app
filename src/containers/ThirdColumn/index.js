import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PlayIcon,NextIcon,PrevIcon,StackedMenuIcon,VolIcon,UserIcon, PauseIcon } from '../../assets/Assets';
import { useStateProvider } from '../../utils/StateProvider';
import useCoverImage from '../../utils/hooks/useCoverImage';

const ThirdColumn = () => {
  const [{ coverId,currentPlaying, songUrl }, dispatch] = useStateProvider();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.1); // Volume range is 0.0 to 1.0
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const audioRef = useRef(null);
  const { imageUrl, loading, error } = useCoverImage(currentPlaying?.cover); 
   // When a new song is selected, update the audio source and play it
   useEffect(() => {
    if (songUrl && audioRef.current) {
      audioRef.current.src = songUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [songUrl]);

  // Handle Play/Pause Toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Audio Progress
  const handleProgress = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    audioRef.current.currentTime = (audioRef.current.duration / 100) * newProgress;
  };

  // Update progress bar as song plays
  const updateProgress = () => {
    if (audioRef.current && audioRef.current.duration) {
      const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(newProgress);
    }
  };

// Toggle volume popover visibility
const toggleVolumeControl = () => {
  setShowVolumeControl(!showVolumeControl);
};


  // Handle Volume Change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };


  return (
    <Container>
      <SongInfo>
        <Title>{currentPlaying?.name}</Title>
        <Artist>{currentPlaying?.artist}</Artist>
      </SongInfo>
      <Cover>
        <img src={imageUrl} alt="Song Cover" />
      </Cover>
        {/* Audio Element */}
        <audio ref={audioRef} onTimeUpdate={updateProgress} />

<TrackSeeker>
  <input type="range" min="0" max="100" value={progress} onChange={handleProgress} />
</TrackSeeker>

      <Controls>
        <MenuIcon>
        <ControlButton backgroundColor="#FFFFFF1A"> 
                
        <img src={StackedMenuIcon} alt='brand-logo' width={"20px"} />
                </ControlButton>
        </MenuIcon>
        <PrevNext>
       
                
        <img src={PrevIcon} alt='brand-logo' width={"20px"} />
               
          {isPlaying ? (
            <PlayPauseButton onClick={togglePlayPause}>
                 <ControlButton backgroundColor="#FFFFFF">
                
              <img src={PauseIcon} alt='brand-logo' width={"40px"} />
                </ControlButton>
            </PlayPauseButton>
          ) : (
            <PlayPauseButton  onClick={togglePlayPause}>
              <ControlButton backgroundColor="transparent">

             <img src={PlayIcon} alt='brand-logo' width={"40px"} />
              </ControlButton>
            </PlayPauseButton>
          )}
         

           <img src={NextIcon} alt='brand-logo' width={"20px"} />
          
        </PrevNext>
        <VolumeIcon>
          <ControlButton backgroundColor="#FFFFFF1A" onClick={toggleVolumeControl}>
            <img src={VolIcon} alt="volume-icon" width="20px" />
          </ControlButton>

          {/* Volume Popover */}
          {showVolumeControl && (
            <VolumeControl>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                style={{ width: '100px' }}
              />
            </VolumeControl>
          )}
        </VolumeIcon>
      </Controls>
    </Container>
  );
};

export default ThirdColumn;
const VolumeControl = styled.div`
  position: absolute;
  top: -40px;
  right: -20;
  transform:rotateX(10deg);
  background-color: #222;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Container = styled.div`
  flex-grow: 1;
  padding: 20px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ControlButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color:${(props) => props.backgroundColor || '#333'}; 
  border-radius: 50%;
  cursor: pointer;

  svg {
    font-size: 24px;
    color: #fff;
  }

  &:hover {
    background-color: #555;
  }
`;
const SongInfo = styled.div`
  text-align: left;
  margin-bottom: 10px;
  align-self:baseline;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Artist = styled.div`
  font-size: 18px;
  color: #aaa;
`;

const Cover = styled.div`
  margin: 20px 0;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
`;

const TrackSeeker = styled.div`
  width: 100%;
  margin-bottom: 10px;
  input {
    width: 100%;
   
    background: #555;
    height: 5px;
    border-radius: 5px;
  }

 
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MenuIcon = styled.div`
  font-size: 24px;
`;

const PrevNext = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 24px;
    cursor: pointer;
  }
`;

const PlayPauseButton = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const VolumeIcon = styled.div`
  font-size: 24px;
   position: relative;
`;
