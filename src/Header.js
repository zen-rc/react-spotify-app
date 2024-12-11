import { useNavigate } from 'react-router-dom'
import React from 'react'

function Header() {
const navigate = useNavigate()
  return (
    <header> 
      <button onClick={() => navigate('/webhooks')}>webhooks</button>
      <h1>react-playlist-title</h1>
    </header>
  );
}

export default Header;