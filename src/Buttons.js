import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

function Buttons() {

    const navigate = useNavigate()
    
    return (
        <div className='buttons'>
            <div className='button' onClick={() => navigate('/')}><button> ||</button></div>
            <div className='button organize-button' onClick={() => navigate('/content')}><button className=".organize-button"> organize</button></div>
            <div className='button' ><button> **</button></div>
        </div>
    )
}

export default Buttons