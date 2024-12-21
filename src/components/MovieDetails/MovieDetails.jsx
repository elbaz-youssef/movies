// import {React,useEffect,useState} from 'react';
import { NavLink} from 'react-router-dom';
import './MovieDetails.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { collection, query, where,  deleteDoc, doc } from 'firebase/firestore';

import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

import { IoIosStarHalf } from "react-icons/io";
import Preload from '../Preload/Preload';
import Button from '../Button/Button';
import { FaPlay } from 'react-icons/fa';

import {db, favoriteRef,watchlistRef } from '../../Firebase/firebase';
import {addDoc, getDocs} from 'firebase/firestore';

function MovieDetails({movie,actors,recommendations,handleClickDetails,handleClickActorDetails,favorites,setFavorites,watchlists,setWatchlists,loading}) {
    window.scrollTo(0,0);

    const currMovie = movie;

    const [addedToFavorite,setAddedToFavorite] = useState(false);
    const [addedToWatchlist,setAddedToWatchlist] = useState(false);






    const handleClickFavorite = async () => {

        if(!addedToFavorite) {
            console.log('-*--*--*-' + favorites);

            const favMovie = {
                key: movie.id,
                title: movie.title,
                src: movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://digitalwellnesslab.org/wp-content/uploads/Header-TV-Movies-Streaming-Video-1024x683.jpg'
            }

            addDoc(favoriteRef, favMovie)
            .then(response => console.log(response))
            .catch(err => console.error(err.message))
            
            setFavorites([...favorites, favMovie.key]);
            setAddedToFavorite(prev => !prev);
    
            // setAddedToFavorite(prev => !prev);
        }
        else {
            console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
           
            setAddedToFavorite(prev => !prev);

            // Create a query to find the document with the specified field value
            const q = query(collection(db, "favorites"), where("key", '==', movie.id));

            // Execute the query and delete the document
            getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                // Assuming there's only one matching document, delete it
                const documentToDelete = querySnapshot.docs[0];
                return deleteDoc(doc(db, "favorites", documentToDelete.id));
                } else {
                console.log("No document found with the specified field value.");
                }
            })
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });

        }

    }

    const handleClickWatchlist = async () => {

        if(!addedToWatchlist) {
            console.log('-*--*--*-' + watchlists);

            const watchMovie = {
                key: movie.id,
                title: movie.title,
                src: movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://digitalwellnesslab.org/wp-content/uploads/Header-TV-Movies-Streaming-Video-1024x683.jpg'
            }
    
            addDoc(watchlistRef, watchMovie)
            .then(response => console.log(response))
            .catch(err => console.error(err.message))

            setWatchlists([...watchlists, watchMovie.key]);
            setAddedToWatchlist(prev => !prev);
    
            // setAddedToFavorite(prev => !prev);
        }
        else {
            console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
            
            setAddedToWatchlist(prev => !prev);

            // Create a query to find the document with the specified field value
            const q = query(collection(db, "watchlists"), where("key", '==', movie.id));

            // Execute the query and delete the document
            getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                // Assuming there's only one matching document, delete it
                const documentToDelete = querySnapshot.docs[0];
                return deleteDoc(doc(db, "watchlists", documentToDelete.id));
                } else {
                console.log("No document found with the specified field value.");
                }
            })
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });

        }


    }


    const addDataFromDbToState = async () => {
        
        try {
          const favDocs = await getDocs(favoriteRef);
          let array = [];
          favDocs.forEach(doc => {
            array.push(doc.data().key);
          })
          console.log('-_-_-_-_-_-_-_-_-_-_-_-_-');
          console.log(array);
          const isAddedFavorite = array.some(key => key === movie.id);
          console.log(currMovie);
          console.log(isAddedFavorite);
          setAddedToFavorite(isAddedFavorite);
          setFavorites(array);
          const watchDocs = await getDocs(watchlistRef);
          let newArray = [];

          watchDocs.forEach(doc => {
            newArray.push(doc.data().key);
          })
          console.log('-_-_-_-_-_-_-_-_-_-_-_-_-');
          console.log(newArray);
          const isAddedWatchlist = newArray.some(key => key === movie.id);
          console.log(currMovie);
          console.log(isAddedWatchlist);
          setAddedToWatchlist(isAddedWatchlist);
          setFavorites(newArray);

        }
        catch(err) {
          console.error(err);
        }
  
        console.log('blablablablabla');
    
    }

    const totalStars = [1,2,3,4,5];
    const rate = Math.round(movie.vote_average) / 2;
    const {id} = useParams();

    console.log(rate);

    useEffect(() => {
        addDataFromDbToState();
    }, [movie]);

    useEffect(() => {
        id && handleClickDetails(id);
    },[id]);

    [1,2,3,4,5].map(i => {
        movie.vote_average / 2 >= i? console.log('star filled') : console.log('star outlined');
    });
        
    console.log('from movie details: <>')
    movie && console.log('movie is: ' + movie);
    console.log(actors);
    console.log(recommendations);

    if(loading) {
        return <Preload />
    }

    return (
        // actors.length? (
        <div className="movie-details px-2 px-sm-4 py-5">
                <div className="movie-details-container text-light d-flex justify-content-between flex-column flex-lg-row">
                    <div className='movie-img'>
                        <div className="img mb-3 position-relative">
                            <img className="rounded-5 w-100"src={ movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://digitalwellnesslab.org/wp-content/uploads/Header-TV-Movies-Streaming-Video-1024x683.jpg'} alt="movie-img" />
                            <div className='play d-flex justify-content-center align-items-center'>
                                <a href='#'>
                                    <FaPlay style={{color: "#1C8ADB", fontSize: "24px"}} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='movie-info ps-lg-3 ps-xl-4 ps-xxl-5'>
                        <h1 className='title mb-3'>{movie.original_title}({movie.release_date && movie.release_date.split('-')[0]})</h1>
                        <p>{movie.tagline}</p>
                        <div className="rate">
                            <div className="d-sm-flex justify-content-between mb-3">
                                <div className='rating d-flex gap-3 mb-2'>

                                    {totalStars.map((i,index) =>  
                                        <span key={index} className='stars d-flex gap-1'>

                                            {rate >= i?  
                                                <IoStar style={{color: '#FFA500'}}/> : 
                                                rate !== Math.floor(rate) && Math.ceil(rate) === i? 
                                                <IoIosStarHalf style={{color: "#FFA500"}}/> : 
                                                <IoStarOutline style={{color: "white"}}/>
                                            }                    

                                        </span>
                                    )}

                                    <span>{movie.vote_average} / 10</span>
                                </div>
                                
                                <span>{movie.runtime}min / {movie.release_date} / {movie.spoken_languages && movie.spoken_languages[0].english_name}</span>
                            </div>
                            <div className="type d-flex justify-content-around mb-3">
                                {movie.genres && movie.genres.map((genre,i)  => (
                                    <span key={i}>{genre.name}</span>   
                                )
                                )}

                            </div>
                            <div className="overview">
                                <h4>Overview</h4>
                                <p>{movie.overview}</p>
                            </div>
                            <div className="actors">
                                <h4 className='mb-3'>Actors</h4>
                                <div className='row'>
                                    {actors && actors.map((actor,i) => 
                                    <div key={i} className="actor-container col-4 col-sm-2 gap-sm-2 col-xl-2 mb-4 gap-3">
                                        <NavLink to={`/actors/${actor.id}`} onClick={() => handleClickActorDetails(actor.id)}>
                                            <div className='actor-img'>
                                                <img className="w-100 rounded-3" src={actor.profile_path? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'} alt="actor" />
                                            </div>
                                            <div className="actor-info">
                                                <span>{actor.name}</span> <br /> 
                                                <span className='text-secondary'>{actor.character}</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className='actions d-flex gap-3 justify-content-center justify-content-lg-start'>
                                <Button handleClickAction={handleClickFavorite} movie={movie} setAddedToFavorite={setAddedToFavorite} addedToFavorite={addedToFavorite} action={'favorite'}>
                                    {addedToFavorite? 'Favorite -' : 'Favorite +'}
                                </Button>
                                <Button handleClickAction={handleClickWatchlist} movie={movie} setAddedToWatchlist={setAddedToWatchlist} addedToWatchlist={addedToWatchlist} action={'watchlist'}>
                                    {addedToWatchlist? 'Watchlist -' : 'Watchlist +'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-center text-white text-capitalize fs-1 mt-5'>you might also like</h2>
                    <div className='row mt-5'>
                        {
                        recommendations.length > 0 && 
                        recommendations.map((movie,i) => 
                            <NavLink to={`/movie/${movie.id}`} key={i} onClick={() => handleClickDetails(movie.id)}  className="movies-recommended col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
                                <div className='img'>
                                    <img className='w-100 rounded-5' src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://digitalwellnesslab.org/wp-content/uploads/Header-TV-Movies-Streaming-Video-1024x683.jpg'} alt='movie' />
                                </div>
                                <div className='content'>
                                    <h5 className='text-center text-light mt-1'>{movie.original_title}</h5>
                                </div>
                            </NavLink>                        
                        )}
                    </div>
                </div>
        </div>
        
    )
}

export default MovieDetails;
