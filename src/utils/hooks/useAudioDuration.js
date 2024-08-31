import { useState, useEffect } from 'react';

const useAudioDuration = (audioUrl) => {
  const [duration, setDuration] = useState(null); 

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);

   
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

   
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioUrl]);

  const formattedDuration = duration
    ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
    : null;

  return { duration, formattedDuration };
};

export default useAudioDuration;
