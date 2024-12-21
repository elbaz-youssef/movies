import Movie from '../Movie/Movie';
import './Movies.css';


function Movies({movies,handleClickDetails,setNPages,title}) {
    console.log(movies.total_pages);
    setNPages(movies?.total_pages > 500? 500 : movies.total_pages);
    const allMovies = movies?.results?.map(movie => <Movie key={movie.id} movie={movie} handleClickDetails={handleClickDetails} />);
    return (
        <div className='movies px-2 px-sm-4 py-5'>
            {title && <h2 className='movies-title text-center text-capitalize pb-1 mb-4'>{title}</h2>}
            <div className='movies-container row'>
                {allMovies}
            </div>
        </div>
    )
}

export default Movies;
