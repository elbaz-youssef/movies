import { useContext, useEffect } from 'react';
import './FavoriteMovies.css';

import {getDocs} from 'firebase/firestore';
import { favoriteRef,watchlistRef } from '../../Firebase/firebase';

import { Context } from '../../App';
import { NavLink } from 'react-router-dom';

const FavoriteMovies = ({favorites,setFavorites,watchlists,setWatchlists}) => {

    // import { db } from '../../Firebase/firebase';
    const user = useContext(Context);

    useEffect(() => {

        const favors = [];
        getDocs(favoriteRef)
        .then(items => {
            items.forEach(doc => {
                console.log(doc.data());
                favors.push(doc.data());
            })
            setFavorites(favors);
        })
        .catch(err => console.error(err));

        const watchs = [];
        getDocs(watchlistRef)
        .then(items => {
            items.forEach(doc => {
                console.log(doc.data());
                watchs.push(doc.data());
            })
            setWatchlists(watchs);
        })
        .catch(err => console.error(err));

    },[])
    return (
        user? (
        <div className='favorites px-2 px-sm-4 py-5'>

            <div className='favorites-movies'>
                <h2 className='movies-title text-center text-capitalize pb-1 mb-4'>Favorite Movies</h2>
                {
                    favorites.length > 0 && (
                        <div className='favorites d-flex gap-3 flex-wrap'>
                        {favorites.map(favorite => 
                            <NavLink to={`/movie/${favorite.key}`} key={favorite.key} className='favorite'>
                                <img src={favorite.src} alt="img" />
                                <p className='mt-2'>{favorite.title}</p>
                            </NavLink>    
                        )}
                        </div>
                    )
                }
            </div>

            <div className='watchlist-movies mt-5'>
                <h2 className='movies-title text-center text-capitalize pb-1 mb-4'>Watchlist Movies</h2>
                {
                    watchlists.length && (
                        <div className='watchlists d-flex gap-3 flex-wrap'>
                        {watchlists.map(watchlist => 
                            <NavLink to={`/movie/${watchlist.key}`} key={watchlist.key} className='watchlist'>
                                <img src={watchlist.src} />
                                <p className='mt-2'>{watchlist.title}</p>
                            </NavLink>    
                        )}
                        </div>
                    )
                }
            </div>
 
        </div>
        ) : (
            <h1 className="px-2 px-sm-4 py-5">You need To login first</h1>
        )
    )
}

export default FavoriteMovies
