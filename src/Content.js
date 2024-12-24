
import { useNavigate } from "react-router-dom"
import Rocket from "./Rocket"

const Content = ({ progress, songsWithFeatures, fetchFeaturesTrigger, playlistData, setPlaylistData, songsArray, setSongsArray, audioFeatures, setAudioFeatures }) => {
    const navigate = useNavigate()

console.log('these are the songs with features', songsWithFeatures)

    if (playlistData === null) {
        navigate('/')
    }
    // console.log('entire playlist', playlistData)
    // console.log('entire songs', playlistData.tracks.items)
    // const songsArray = playlistData.tracks.items
    const playlistCover = playlistData.images[0].url
    // const linkedSongs = playlistData.tracks.items
    // const keyOrder = {
    //     'C': 0, 'A minor': 0,       // C major and A minor are relative
    //     'G': 1, 'E minor': 1,       // G major and E minor are relative
    //     'D': 2, 'B minor': 2,       // D major and B minor are relative
    //     'A': 3, 'F# minor': 3,      // A major and F# minor are relative
    //     'E': 4, 'C# minor': 4,      // E major and C# minor are relative
    //     'B': 5, 'G# minor': 5,      // B major and G# minor are relative
    //     'F#': 6, 'D# minor': 6,     // F# major and D# minor are relative
    //     'Db': 7, 'Bb minor': 7,     // Db major and Bb minor are relative
    //     'Ab': 8, 'F minor': 8,      // Ab major and F minor are relative
    //     'Eb': 9, 'C minor': 9,      // Eb major and C minor are relative
    //     'Bb': 10, 'G minor': 10,    // Bb major and G minor are relative
    //     'F': 11, 'D minor': 11      // F major and D minor are relative
    // };

    // console.log('this is songsArray', songsArray)
    // console.log('this is audio features', audioFeatures)
    // console.log('these are the track ids', songsArray.map((element, i) => songsArray[i].track.id).join(',')
    // )
    // function findingSongs(){
    //     for(let i = 0; i < songsArray.length; i++) {

    //        if(songsArray[i].track.id === `2j1fFjWHCI9KJSwcuYAOyF`){
    //         console.log('duplicate id')
    //        }
    //         console.log('this is the track object', songsArray[i].track)

    //         console.log('this is the track object', songsArray[i].track.artists[0].name)

    //     }
    // }
    // findingSongs()
    // const organizeSongs = () => {
    //     console.log('sorting songs')

    //     console.log(playlist)
    //     const listSongs = [...playlist].sort((a, b) => {
    //         //need to edit this to be compatible with an array of genres.
    //         if (a.genre !== b.genre) {
    //             return a.genre.localeCompare(b.genre)
    //         }

    //         if (keyOrder[a.key] !== keyOrder[b.key]) {
    //             return keyOrder[a.key] - keyOrder[b.key]
    //         }

    //         return b.bpm - a.bpm
    //     })
    // }

    return fetchFeaturesTrigger ? (
        <Rocket 
        progress={progress}
        />
      ) : (
        <div>
          <div className="screenHeader">
            <img src={playlistCover} alt="playlist cover" />
            <h2>{playlistData.name}</h2>
          </div>
          {/* find a way to put the image here */}
          {/* playlistData.tracks.items */}
      
          <ol className="playlist" style={{ listStyleType: "none" }}>
            {songsArray.map((song, i) => (
              <li className="song" key={songsArray[i].track.id +i}> 
              {/* +i gets rid of the duplicate songs */}
                <p>{songsArray[i].track.name}</p>
                <p>{songsArray[i].track.artists[0].name}</p>
                <p>id: {songsArray[i].track.id}</p>
              </li>
            ))}
          </ol>
        </div>
      );
      
    }

export default Content;