
import { useState, useEffect } from 'react'
import Rocket from './Rocket'

function Test({ songsArray, playlistInput, setPlaylistInput, find, playlistData, setPlaylistData}) {

    // function findFeatures() {
        // songsArray.map
    // }
    const fakePause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [loading, setLoading] = useState(false);


  const handleButtonClick = async () => {
    setLoading(true);
    await fakePause(2000); // Simulate a 2-second pause
    setLoading(false);
  };

    return (
    
        <div className="home">
            <h2>Welcome!</h2>
            <p>This is the test component</p>
            <div className="form-group">
                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
                    <label htmlFor="spotify-link">Enter Link Below:</label>
                    <input
                        placeholder="Spotify link here"
                        type="url"
                        name="spotify-link"
                        id="spotify-link"
                        required
                        value={playlistInput} // Controlled input value
                        onChange={(e) => setPlaylistInput(e.target.value)} // Update state on input change
                    />
                </form>
                <section>
                    {loading ? <Rocket/> : <span>Number of songs {songsArray.length}</span>}
                </section>
            </div>

            <button type="button" onClick={find} style={{color: "purple"}}>
                Find Playlist
            </button>
            <button style={{color: "purple"}} onClick={handleButtonClick} disabled={loading}> Find Features

      </button>

            {/* Optionally display playlist data */}
            {playlistData && (
                <div>
                    <h3>Playlist Details</h3>
                    <p>Title: {playlistData.name}</p>
                    <p>Number of tracks: {playlistData.tracks.total}</p>
                    {/* Render other details as needed */}
                </div>
            )}
        </div>
    );
}

export default Test;
