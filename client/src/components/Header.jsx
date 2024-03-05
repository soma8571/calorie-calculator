import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <div className='site-title'>
        Kalória kalkulátor
      </div>

      <div className="main-menu">
        <header>
          <nav>
              <ul className='main-nav'>
                <li><Link to={"/"}>Főoldal</Link></li>
                <li><Link to={"/uj-etel"}>Új étel hozzáadása</Link></li>
              </ul>
          </nav>
        </header>
      </div>

    </div>
  )
}

export default Header;
