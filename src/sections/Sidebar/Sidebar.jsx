import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Sidebar.css';
import { NavLink } from 'react-router-dom';

function Sidebar({barClicked, setBarClicked, handleChangeGenre,handleClickNavItems,setTitle}) {

  const items = ['All','Top Rated','Popular','UpComing'];

  const [genres,setGenres] = useState([]);
  const getGenres = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=56b4c65fbfa0edfe0748a22f207e0133`);
      setGenres(response.data.genres);
  }
  useEffect(() => {
      getGenres();
  })

  return (
    <div className={barClicked? 'sidebar show-side-bar' : 'sidebar d-none d-md-block'}>

      <h1 className='logo d-none d-md-block'>MoviesLand</h1>
      <ul className='sidebar-lists'>
        <div className='sidebar-section'>
          <h5 className='sidebar-filter'>Categories</h5>
          {items?.map((item,i) => 
          <NavLink 
            to='/' 
            className='item' 
            key={i}
            onClick={() => {setTitle(item + ' movies'); handleClickNavItems(item)}} >
              {item}
          </NavLink>)}
        </div>
        <div className='sidebar-section'>
          <h5 className='sidebar-filter'>Genres</h5>
          {genres?.map(genre => 
            <NavLink 
              to='/' onClick={(e) => {setTitle(genre.name + ' movies'); handleChangeGenre(e.target.id,'genre')}}
              className='item' 
              key={genre.id} 
              id={genre.id} >
                {genre.name}
            </NavLink> 
          )}
        </div>

      </ul>
      
    </div>
  )
}

export default Sidebar;