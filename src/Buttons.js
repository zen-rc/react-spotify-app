import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

function Buttons({playlistData, setPLaylistData}) {

    const navigate = useNavigate()
    
    return (
        <div className='buttons'>
            <div className='button' onClick={() => navigate('/')}><button> ||</button></div>
            <div className='button organize-button' onClick={() => {
                playlistData === null ? alert('Please input a valid playlist') : navigate('/content')}}><button className=".organize-button"> organize</button></div>
            <div className='button' onClick={() => navigate('/rocket')} ><button> **</button></div>
        </div>
    )
}

export default Buttons