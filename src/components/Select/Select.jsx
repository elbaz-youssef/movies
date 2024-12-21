import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Select({handleChangeGenre}) {
    const [genres,setGenres] = useState([]);
    const getGenres = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=56b4c65fbfa0edfe0748a22f207e0133`);
        setGenres(response.data.genres);
    }
    useEffect(() => {
        getGenres();
    })
    return (
        <select className='genres' onChange={(e) => handleChangeGenre(e.target.value,'genre')} name="genres" id="genres">
            <optgroup label="Genres">
                {genres?.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option> )}
            </optgroup>
        </select>
    )
}

export default Select;
