
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'

// import Rocket from "./Rocket"

const Content = ({ 
  progress, songsWithFeatures, fetchFeaturesTrigger, playlistData, setPlaylistData, songsArray, setSongsArray, audioFeatures, setAudioFeatures }) => {
    const navigate = useNavigate()

console.log('these are the songs with features', songsWithFeatures)

    if (playlistData === null) {
        navigate('/')
    }

    const playlistCover = playlistData.images[0].url
    

    const songTimeline = () => {
      // const release = songsArray[i].track.album.release_date
      // console.log(release)
      const organizedSongs = songsArray.sort((a,b) => {
        if(a.track.album.release_date < b.track.album.release_date) return -1
        if(a.track.album.release_date > b.track.album.release_date) return 1
        return 0
      })
      setSongsArray(organizedSongs)
    }

    const [decadeCount, setDecadeCount] = useState({})
    const [mostFrequentDecade, setMostFrequentDecade] = useState(null)

      // passing an array of songs, sorted by release date
      // returning most frequent decade present
      // example:
      // Input: [1990, 1993, 2000, 2025] --> Output: 'You're 90's Royalty!
      
      // WHAT I KNOW
      // ppl can have playlists with a number of decades from 1908-2025
      // I want to isolate the length of two decades, and compare them
      // I want to return the decade with a larger length
useEffect(() => {
  const DecadeFinder = () => {
    
    const decadeCount = {}

      songsArray.forEach(dateStr => {
        const year = parseInt(dateStr.slice(0, 4))
        const decade = Math.floor(year/ 10) * 10

        if(decadeCount[decade]) {
          decadeCount[decade] += 1
        } else {
          decadeCount[decade] = 1
        }

      })

      let maxDecade = null
      let maxCount = 0

        for(const decade in decadeCount) {
          if(decade[decade] > maxCount) {
            maxDecade = decade
            maxCount = decadeCount[decade]
          }
        }
        console.log(`Congrats! You are ${maxDecade} Royalty!`)
  }
  setMostFrequentDecade(maxDecade)
})


    //} // might be rogue brace 
    songTimeline()
    DecadeFinder()

    return (

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
                <img src={songsArray[i].track.album.images[0].url} />
                <p>{songsArray[i].track.name}</p>
                <p>{songsArray[i].track.artists[0].name}</p>
                <p>release date: {songsArray[i].track.album.release_date}</p>
              </li>
            ))}
          </ol>
        </div>
      );
      
    }

export default Content;