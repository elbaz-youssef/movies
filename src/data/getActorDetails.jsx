
import axios from 'axios';



const getActorDetails = async (actorDetailsUrls,setActor,setActorMovies,setLoading) => {
    
    setLoading(true);
    try {

        actorDetailsUrls.forEach(async (url,i) => {
            console.log(url);
            const response = await axios.get(url);
            if(i === 0) {
                setActor(response.data);
                console.log(response.data);
            }
            else {
                setActorMovies(response.data.cast.sort((a,b) => b.popularity - a.popularity).slice(0,20));
                console.log(response.data.cast.sort((a,b) => b.popularity - a.popularity).slice(0,20));
            }
        })
    }
    catch (error) {
        return(error);
    }
    setLoading(false);
}

export {getActorDetails};
