import {NavLink} from 'react-router-dom';
import './Movie.css';

function Movie({movie,handleClickDetails}) {

    return (
        <NavLink to={`/movie/${movie.id}`} key={movie.id} className='movie-col col-sm-4 col-xl-3 mb-4'>

            <div onClick={() => handleClickDetails(movie.id)} className='movie-container'>
                <div className='movie'>
                    <img 
                        className="img-fluid"
                        src={movie?.poster_path? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : 'https://digitalwellnesslab.org/wp-content/uploads/Header-TV-Movies-Streaming-Video-1024x683.jpg'}
                        alt="movie" 
                    />
                    <div className="overlay">
                        <span className="year text-light p-3">{movie?.release_date?.split('-')[0]}</span>
                        <div className="movie-info">
                            {/* <h6 className='type text-uppercase'>movie</h6> */}
                            <h5 className="title text-center">{movie?.original_title}</h5>
                        </div>
                    </div>                      
                </div>
            </div>
            
        </NavLink>
    )
}

export default Movie;

