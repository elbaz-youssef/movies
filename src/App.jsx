import { useState, useEffect, useRef, createContext } from 'react';
import { Header, Main, Pagination, Sidebar } from './sections';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { getMovies } from './data/GetMovies';
import { getMovieDetails } from './data/getMovieDetails';
import { MovieDetails, ActorDetails, Movies, Preload} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getActorDetails } from './data/getActorDetails';
import FavoriteMovies from './components/FavoritesMovies/FavoriteMovies';




const apiKey = '56b4c65fbfa0edfe0748a22f207e0133';

export const Context = createContext();


const App = () => {
 
  const [movies,setMovies] = useState([]);
  const [movie,setMovie] = useState({});
  const [actors,setActors] = useState([]);
  const [recommendations,setRecommendations] = useState([]);
  const [nPages,setNPages] = useState(null);
  const [cPage,setCPage] = useState(1);
  const [filter,setFilter] = useState('all');
  const [url,setUrl] = useState(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
  const [user,setUser] = useState(null);
  const [title,setTitle] = useState('all movies');
  const [search,setSearch] = useState(false);
  const [loading,setLoading] = useState(true);
  const [actor, setActor] = useState({});
  const [actorMovies, setActorMovies] = useState([]);
  const [barClicked,setBarClicked] = useState(false);
  const [favorites,setFavorites] = useState([]);
  const [watchlists,setWatchlists] = useState([]);

  const mainRef = useRef(null);

  const filterUrls = {
    All: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`,
    UpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    "Top Rated": `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
    Popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
    search: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`,
    genre: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
  }


  // handle change categories
  const handleClickNavItems = (filter) => {
    setActors([]);
    setCPage(1);
    setFilter(filter);
    setUrl(filterUrls[filter]);
    setSearch(false);
    getMovies(url + `&page=1`,setMovies,setLoading);
    setBarClicked(false);
    mainRef.current.scrollTo(0,0);
  }

  // handle change genre
  const handleChangeGenre = (genre,filter) => {
    setActors([]);
    setCPage(1);
    setFilter(filter);
    setUrl(filterUrls[filter] + `&with_genres=${genre}`);
    getMovies(url + `&page=1`,setMovies);
    setBarClicked(false);
    mainRef.current.scrollTo(0,0);
  }

  // handle click search
  const handleSearch = (query,filter) => {
    setActors([]);
    setCPage(1);
    setFilter(filter);
    setUrl(filterUrls[filter] + `&query=${query}`);
    getMovies(url + `&page=1`, setMovies);
    setBarClicked(false);
    mainRef.current.scrollTo(0,0);
    setTitle('');
  }

  // handle click of movie details
  const handleClickDetails = (id) => {
    const detailsUrls = [
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
    ];
    const setDetails = [setMovie,setActors,setRecommendations];
    setSearch(true);
    getMovieDetails(detailsUrls,setDetails,setLoading);
    setBarClicked(false);
    mainRef.current.scrollTo(0,0);
  }

  // handle click of actor details
  const handleClickActorDetails = async (id) => {
    console.log('id is: ' + id)
    const actorDetailsUrls = [
        `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`,
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`
    ];
    setSearch(false);
    getActorDetails(actorDetailsUrls, setActor, setActorMovies, setLoading);
    setBarClicked(false);
    mainRef.current.scrollTo(0,0);
  };

  // handle click bar item to toogle between appear and disapear the sidebar in the small screen after each click on bar
  const handleBarClicked = () => {
    setBarClicked(!barClicked);
  }

  useEffect(() => {
    getMovies(url + `&page=${cPage}`,setMovies,setLoading);
  },[cPage,filter,url]);

  useEffect(() => {
    window.scrollTo(0,0);
    console.log('----------sisisisisisis--------------');
  },[])

  if(loading) {
    return <Preload />
  } 

  return (
      <div className="app">

        <BrowserRouter>

          <Context.Provider value={user}>
            <div className="home d-flex">
              <Sidebar barClicked={barClicked} setBarClicked={setBarClicked} handleChangeGenre={handleChangeGenre} handleClickNavItems={handleClickNavItems} setTitle={setTitle} />
              <Main mainRef={mainRef}>
                <Header handleBarClicked={handleBarClicked} user={user} setUser={setUser} handleSearch={handleSearch} search={search} />
                <Routes>
                  {["/movies", "/", ""].map((path, index) => 
                    <Route key={index} path={path} element={<Movies key={index} movies={movies} handleClickDetails={handleClickDetails} setNPages={setNPages} title={title} /> } /> 
                  )}
                  <Route path="/movie/:id" element={<MovieDetails movie={movie} handleClickDetails={handleClickDetails} handleClickActorDetails={handleClickActorDetails}  actors={actors} recommendations={recommendations} loading={loading} setFavorites={setFavorites} watchlists={watchlists} setWatchlists={setWatchlists} favorites={favorites} />} />

                  <Route path="/actors/:id" element={<ActorDetails user={user} actor={actor} actorMovies={actorMovies} handleClickActorDetails={handleClickActorDetails} />} />
                  <Route path="/profile" element={<FavoriteMovies favorites={favorites} setFavorites={setFavorites} watchlists={watchlists} setWatchlists={setWatchlists} />} />
                </Routes>
                <Pagination nPages={nPages} cPage={cPage} setCPage={setCPage} />
              </Main>
            </div>
          </Context.Provider>
        
        </BrowserRouter>
   
      </div>
    )
    

}


export default App;



