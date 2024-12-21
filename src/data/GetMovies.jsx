import axios from "axios";



const getMovies = async (url,setMovies,setLoading) => {
    setLoading(true);
    try {
        const response = await axios.get(url);
        console.log(response.data);
        setMovies(response.data);
    }
    catch (error) {
        return error;
    }
    setLoading(false);
}

export {getMovies};

