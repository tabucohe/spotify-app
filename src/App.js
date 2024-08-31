
import { useEffect } from 'react';
import './App.css';
import Layout from './containers/Layout';
import { reducerCases } from './utils/ConstantTypes';
import { StateContext, useStateProvider } from './utils/StateProvider';

function App() {
  const [{ forYouPlaylists, topTracksPlaylist }, dispatch] = useStateProvider();
  const fetchSongList = async () => {
    try {
      const response = await fetch('https://cms.samespace.com/items/songs');
      const data = await response.json();
      
      // Dispatch action to update context
      dispatch({
        type: reducerCases.SET_TOP_TRACKS,
        playlist: data.data.filter(el => el.top_track === true),
      });
      dispatch({
        type: reducerCases.SET_FOR_YOU,
        playlist: data.data.filter(el => el.top_track !== true),
      });
    } catch (error) {
      console.error('Error fetching song list:', error);
    }
  };

  useEffect(() => {
    fetchSongList();
  }, []);

  return (
    <Layout/>
  );
}

export default App;
