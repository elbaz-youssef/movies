
import { NavLink, useParams } from 'react-router-dom';
import './ActorDetails.css';




import React, { useEffect } from 'react';

const ActorDetails = ({ actor,actorMovies,handleClickActorDetails }) => {

    const {id} = useParams();

    useEffect(() => {
        handleClickActorDetails(id);
    }, [id])

    return (
        <div className='actor px-2 px-sm-4 py-5'>
            <div className='actor-details d-flex justify-content-between flex-column flex-lg-row'>
                <div className="actor-img me-3 mb-3">
                    <img src={actor.profile_path? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : `https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg`} alt="actor-img" />
                </div>
                <div className="actor-content">
                    <h2 className="name">{actor.name} ({actor.birthday})</h2>
                    <p className="overview">{actor.biography}</p>
                </div>
            </div>
            <h2 className='text-center text-capitalize fs-1 mt-5'>Movies</h2>
            <div className="actor-movies-container row mt-5">
                {actorMovies.map((movie,i) => (
                    <NavLink to={`/movie/${movie.id}`} key={i} className='actor-movies  movies-recommended col-6 col-sm-4 col-lg-3 col-xl-2 mb-3'>
                            <div className='img'>
                                <img className='w-100 h-100 rounded-5' src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://digitalwellnesslab.org/wp-content/uploads/Header-TV-Movies-Streaming-Video-1024x683.jpg`} alt='movie-img' />
                            </div>
                            <h5 className='text-center text-light mt-1'>{movie.title}</h5>
                    </NavLink>
                ))}
            </div>
            
            
        </div>
    );
};

export default ActorDetails;

