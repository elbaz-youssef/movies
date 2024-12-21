import axios from "axios";



const getMovieDetails = async (urls,setDetails,setLoading) => {
    setLoading(true);
    try {
        urls.forEach(async (url,i) => {
            const response = await axios.get(url);  
            if(!i) setDetails[i](response.data);
            else if(i === 1) setDetails[i](response.data.cast.slice(0,6));
            else setDetails[i](response.data.results.slice(0,20));
        })    
    }
    catch (error) {
        return error;
    }
    setLoading(false);
}

export {getMovieDetails};