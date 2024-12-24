import Content from './Content.js'
import Header from './Header.js'
import Home from './Home.js'
import Footer from './Footer'
import Buttons from './Buttons.js'
import Rocket from './Rocket.js'
import './App.css';
import Test from './Test.js'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'



function App() {

  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [progress, setProgress] = useState()

  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;


  const location = useLocation()
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const authParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
        };
        const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
        if (!response.ok) {
          throw new Error(`Error fetching access token: ${response.status}`);
        }
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (err) {
        console.error('Error fetching access token:', err);
      }
    };

    fetchAccessToken();
  }, [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET]); // Dependency array ensures the effect runs when CLIENT_ID or CLIENT_SECRET changes


  const [playlistInput, setPlaylistInput] = useState("");
  const [playlistData, setPlaylistData] = useState(null);
  const [songsArray, setSongsArray] = useState([])

  useEffect(() => {
    if (location.pathname === "/") {
      setPlaylistInput("");
      setPlaylistData(null);
      localStorage.removeItem("playlistInput");
      localStorage.removeItem("playlistData");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check for stored data in localStorage
    const storedPlaylistInput = localStorage.getItem("playlistInput");
    const storedPlaylistData = localStorage.getItem("playlistData");

    if (storedPlaylistInput) {
      setPlaylistInput(storedPlaylistInput); // Restore playlistInput from localStorage
    }

    if (storedPlaylistData) {
      setPlaylistData(JSON.parse(storedPlaylistData)); // Restore playlistData from localStorage
    }
  }, [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET]);

  // Whenever the playlistInput or playlistData changes, update localStorage
  useEffect(() => {
    localStorage.setItem("playlistInput", playlistInput);
    localStorage.setItem("playlistData", JSON.stringify(playlistData));
  }, [playlistInput, playlistData]);


  // Save playlist data to local storage whenever it changes
  useEffect(() => {
    if (playlistData) {
      localStorage.setItem('playlistData', JSON.stringify(playlistData));
    }
  }, [playlistData]);

  // Fetch access token when the component mounts

  // Function to handle the search logic
  async function find() {
    const playlistId = playlistInput.includes('/playlist/') ? playlistInput.split('/playlist/')[1].split('?')[0] : alert('please ener a valid playlist')
    console.log('Extracted Playlist ID:', playlistId); //running up until this point

    // Check if playlistId is valid
    if (!playlistId) {
      console.error('Invalid playlist ID');
      return;
    }

    console.log('Fetching playlist ID:', playlistId);

    // Ensure accessToken is set before making the request
    if (!accessToken) {
      console.error('Access token not available');
      return;
    }
    try {

      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the access token to the header
        },
      });
      if (!response.ok) {
        console.error('Error response status:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Playlist data:', data);

      // Set playlist data in state
      setPlaylistData(data);
      localStorage.setItem('playlistData', JSON.stringify(data));
      setSongsArray(data.tracks.items)
      console.log('this is songsArray', songsArray)
      localStorage.setItem('songData', JSON.stringify(data.tracks.items));
      // console.log('this is the songsArray')
    } catch (err) {
      console.error('Error fetching playlist:', err);
    }
  }

const base = "https://api.tunebat.com/api/tracks/search";
const param = "term";
const [fetchFeaturesTrigger, setFetchFeaturesTrigger] = useState(false);
const [songsWithFeatures, setSongsWithFeatures] = useState([]);

useEffect(() => {
  if (!fetchFeaturesTrigger) return; //false, dont do anything

  const fetchFeatures = async () => {
    console.log('About to fetch features');

    const fetchSongFeatures = async () => {
      const updatedFeatures = [...songsWithFeatures]; //the array of songs with features, will be kept in the updated Features array
      let retryCount = 17; //amount of time before remaking a request

      for (let i = 0; i < songsArray.length; i++) { //looping through songs
        if (updatedFeatures[i] || updatedFeatures.includes(songsArray[i].track.id)) { //if this song already exists in the array, skip
          continue;
        }

        const { name: title, artists } = songsArray[i].track;
        const artist = artists[0].name;
        const query = encodeURI(`${artist}-${title}`);
        const url = `${base}?${param}=${query}`;

        try {
          // while (true) { //basically an infinite loop.
            try {
              const response = await fetch(url);
              const text = await response.text();

              const data = JSON.parse(
                text
                  .normalize("NFD")
                  .replace(/[̀-\u036f]/g, "")
                  .replace(/’/g, "'")
              ).data.items;

              while(!data) {
                console.log('Data undefined. Retrying.');
                await new Promise((resolve) => setTimeout(resolve, retryCount * 1000));
                retryCount++;
                // continue;
              }

              updatedFeatures[i] = data[0];
              setProgress(i);
              setSongsWithFeatures(updatedFeatures);

              console.log(`Processed song #${i}: ${title} by ${artist}`, data[0]);
              break;
            } catch (e) {
              if (e.response?.status === 429) {
                console.log(`Request restricted. Retrying after ${retryCount} seconds`);
                await new Promise((resolve) => setTimeout(resolve, retryCount * 1000));
                retryCount++;
              } else {
                console.error('Unhandled error:', e);
                throw e;
              }
            }
          }
      // }
          catch (err) {
          console.error(`Error fetching data for song at index ${i}:`, err);
        }
      }
    };

    try {
      await fetchSongFeatures();
      console.log('Done fetching features');
    } catch (err) {
      console.error('Error in fetching features:', err);
    } finally {
      setFetchFeaturesTrigger(false);
    }
  };

  fetchFeatures();
}, [fetchFeaturesTrigger, songsArray, songsWithFeatures]);




  // const bpm = data.data.items[0].b
  // const key = data.data.items[0].k
  // const camelot = data.data.items[0].camelot
  // const energy = data.data.items[0].e
  // const happiness = data.data.items[0].h
  // const danceibility = data.data.items[0].da


















  return (

    <div className="App">
      <Header />
      <main>
        <div className="mp3-player">
          <div className='screen'>

            <Routes>
              <Route path='/' element={<Home
                playlistInput={playlistInput}
                setPlaylistInput={setPlaylistInput}
                find={find}
                playlistData={playlistData}
                setPlaylistData={setPlaylistData}
              />} />
              <Route path='/content' element={<Content
                fetchFeaturesTrigger={fetchFeaturesTrigger}
                playlistData={playlistData}
                songsArray={songsArray}
                songsWithFeatures={songsWithFeatures}
                progress={progress}
              />} />
              <Route path='rocket' element={<Rocket/>}/>
            </Routes>

          </div>
          <Buttons playlistData={playlistData}
            setplaylistData={setPlaylistData}
            setFetchFeaturesTrigger={setFetchFeaturesTrigger}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
