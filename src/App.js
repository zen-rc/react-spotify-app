import Content from './Content.js'
import Header from './Header.js'
import Home from './Home.js'
import Footer from './Footer'
import Buttons from './Buttons.js'
import Rocket from './Rocket.js'
import Webhooks from './Webhooks.js'
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'



function App() {

// loop through the names and artists of songsArray
// variables to hold title and artist
// do an API request after extracting the title and artists, to get mbids

// useEffect(() => {
//   console
//   async function findAudioFeatures() {
//     try {
//       const response = await fetch(``)

//       if(!response.ok){
//         console.error('Not fetched')
//         return
//       }
//       const data = await response.json();
//       console.log('this is the data:', data)
//     }
//     catch(error) {
//       console.error('Problem fetching')
//     }
//   }
  
//   findAudioFeatures()
// }, [])


  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;


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
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };
        const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
        console.log('https://accounts.spotify.com/api/token', authParameters)
        if (!response.ok) {
          throw new Error(`Error fetching access token: ${response.status}`);
        }
        const data = await response.json();
        setAccessToken(data.access_token);
        console.log('Access token received:', data.access_token);
      } catch (err) {
        console.error('Error fetching access token:', err);
      }
    };

    fetchAccessToken();
  }, [CLIENT_ID, CLIENT_SECRET]); // Dependency array ensures the effect runs when CLIENT_ID or CLIENT_SECRET changes


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
  }, [CLIENT_ID, CLIENT_SECRET]);

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
      console.log('playlist about to be set')
      setPlaylistData(data);
      localStorage.setItem('playlistData', JSON.stringify(data));
      console.log('playlist data set')
      setSongsArray(data.tracks.items)
      localStorage.setItem('songData', JSON.stringify(data.tracks.items));
      // console.log('this is the songsArray')
    } catch (err) {
      console.error('Error fetching playlist:', err);
    }
  }

  const [audioFeatures, setAudioFeatures] = useState([]) //is not ever changing. how to
  useEffect(() => {

    const uniqueTrackIds = Array.from(new Set(songsArray.map((element, i) => songsArray[i].track.id))).join(',')
    console.log('these are the songs', songsArray)
    console.log('these are the track ids', uniqueTrackIds.length)
    const fetchAudioFeatures = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${uniqueTrackIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch audio features: ${response.status}`);
        }
        const songData = await response.json();
        setAudioFeatures(songData.audio_features);
      } catch (err) {
        console.error("Error fetching audio features:", err);
      }
    };

    if (uniqueTrackIds.length > 0 && accessToken) {
      fetchAudioFeatures(); // Call the async function
    }
  }, [songsArray, accessToken]);

// loop through the names and artists of songsArray
// variables to hold title and artist
// do an API request after extracting the title and artists, to get mbids
// const url = `https://musicbrainz.org/ws/2/recording/?query=recording:"${encodeURIComponent(songTitle)}" AND artist:"${encodeURIComponent(artistName)}"&fmt=json`;

// i need to push all mbids into an array
// i need to a map  on the mbids in the Acoustic Brainz api to retrieve low-level data (for now)
// i need to extract the audio features from Acoustic Brainz API and create a unique audiofeatures object, holding bpm, danceibility, etc
// push this new object into songsArray
// build algorithm using audio features



  // THIS IS THE MUSIC   BRAINZ API/////
  // const [musicData, setMusicData] = useState([])
  // useEffect(() => {
  //   const tracks = ''
  //   const fetchMusicBrainzData = async () => {
  //     try {

  //       const response = await fetch(`https://acousticbrainz.org/${mbid}/low-level`,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );


  //       if (!response.ok) {
  //         throw new Error(`Error fetching access token: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setMusicData(data);
  //       console.log('audio data received:', data);
  //     } catch (err) {
  //       console.error('Error fetching audio data:', err);
  //     }
  //   };

  //   fetchMusicBrainzData();
  // }, [songsArray]);




















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
                playlistData={playlistData}
                setPlaylistData={setPlaylistData}
                songsArray={songsArray}
                setSongsArray={setSongsArray}
                audioFeatures={audioFeatures}
                setAudioFeatures={setAudioFeatures}
              />} />
              <Route path='/rocket' element={<Rocket/>}
              />
              <Route path='/webhooks' element={<Webhooks/>}
              />
            </Routes>
          </div>
          <Buttons playlistData={playlistData}
          setplaylistData={setPlaylistData}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
