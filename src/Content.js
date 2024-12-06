import { useState } from 'react'

const Content = ({playlistData, setPlaylistData}) => {

    // console.log('entire playlist', playlistData)
    // console.log('entire songs', playlistData.tracks.items)
    const songsArray = playlistData.tracks.items
    // const linkedSongs = playlistData.tracks.items
    const [playlist, setPlaylist] = useState([
        {
            id: 1,
            title: 'Summer Rain',
            artist: 'Carl Thomas',
            emotion: 'Romantic',
            subject: 'Love',
            genre: 'R&B', //This SHOULD be an array (i think). I need to find a way to make an array of genres to be sorted and compared in the algorithmm
            instruments: ['keys', 'drums', 'bass'],
            bpm: 186,
            key: 'F#',
        },
        {
            id: 2,
            title: 'Chamber of Reflection',
            artist: 'Rich',
            emotion: 'Melancholy',
            subject: 'Introspection',
            genre: 'Indie Folk',
            instruments: ['keys'],
            bpm: 131,
            key: 'E minor'
        },
        {
            id: 3,
            title: 'Forgiveless',
            artist: 'SZA',
            emotion: 'Defiant',
            subject: 'Forgiveness and revenge',
            genre: 'R&B',
            instruments: ['Beat production', 'sample loops'],
            bpm: 80,
            key: 'A'
        },
        {
            id: 4,
            title: 'Love Is Blind',
            artist: 'Ravyn Lenae',
            emotion: 'Yearning',
            subject: 'Love',
            genre: 'R&B',
            instruments: ['Synth', 'bass guitar', 'drum machine'],
            bpm: 100,
            key: 'A'
        }


    ])
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

    function findingSongs(){
        for(let i = 0; i < songsArray.length; i++) {
            console.log('this is the track object', songsArray[i].track)
            // console.log('this is the track object', songsArray[i].track.name)
            // console.log('this is the track object', songsArray[i].track.artists[0].name)

        }
    }
    findingSongs()
    const organizeSongs = () => {
        console.log('sorting songs')
                    
        console.log(playlist)
        // const listSongs = [...playlist].sort((a, b) => {
        //     //need to edit this to be compatible with an array of genres.
        //     if (a.genre !== b.genre) {
        //         return a.genre.localeCompare(b.genre)
        //     }

        //     if (keyOrder[a.key] !== keyOrder[b.key]) {
        //         return keyOrder[a.key] - keyOrder[b.key]
        //     }

        //     return b.bpm - a.bpm
        // })
    }

    return (
                <div>
                    {/* find a way to put the image here */}
                    {/* playlistData.tracks.items */}
                    <h2>Playlist: {playlistData.name}</h2>
                    <ol className='playlist' style={{ listStyleType: 'none' }}>
                        {
                            songsArray.map((song, i) => {
                                return (
                                    <li className="song" key={songsArray[i].track.id}>
                                        <p>{songsArray[i].track.name}</p>
                                        <p>{songsArray[i].track.artists[0].name}</p>
                                    </li>)
                            })}
                    </ol>
                </div>



    )
}

export default Content