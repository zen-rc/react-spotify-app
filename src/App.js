import Content from './Content.js'
import Header from './Header.js'
import Home from './Home.js'
import Footer from './Footer'
import Buttons from './Buttons.js'
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'



function App() {

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
    const playlistId = playlistInput.split('/playlist/')[1].split('?')[0];
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
    } catch (err) {
        console.error('Error fetching playlist:', err);
    }
}

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
            />} /> 

          </Routes> 
          </div>
          <Buttons />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
