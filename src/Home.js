
function Home({ playlistInput, setPlaylistInput, find, playlistData, setPlaylistData}) {
    // this code vvvvvv doesn't catch all the errors

    //   this code ^^^^^ doesnt catch all the errors
    // console.log('this is the playlist input', playlistInput)
    // console.log('this is the playlist name', playlistData)
    return (
        <div className="home">
            <h2>Welcome!</h2>
            <p>This is my playlist organizer</p>
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
            </div>

            <button type="button" onClick={find} style={{color: "purple"}}>
                Find Playlist
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

export default Home;
