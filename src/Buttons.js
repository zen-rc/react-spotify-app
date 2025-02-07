import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useState } from "react"

function Buttons({ playlistData, setPlaylistData, setFetchFeaturesTrigger }) {

    const navigate = useNavigate()

    return (
        <div className='buttons'>
            <div className='button' onClick={() => navigate('/')}><button> ||</button></div>
            <div className='button organize-button' >
                <button className="organize-button" onClick={() => {
                    if (playlistData === null) {
                        alert('Please input a valid playlist')
                    }
                    else { 
                        navigate('/content') }
                }
                }
                > organize
                </button>
            </div>
            <div className='button' onClick={() => navigate('/rocket')} ><button> **</button></div>
        </div>
    )
}

export default Buttons