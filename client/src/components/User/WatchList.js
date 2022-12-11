import {useEffect, useState} from "react";
import axios from "axios";
import Carousel from "./Carousel";
import {Link} from "react-router-dom";

const WatchList = (props) => {
    const {watchlist} = props;
    const [movies, setMovies] = useState([]);

    const getPosterURL = (posterPath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`
    }

    useEffect(() => {
        for (let movieId of watchlist) {
            axios.get(`http://localhost:4000/api/movies?where={"id": "${movieId}"}&limit=1`)
                .then((response) => {
                    setMovies(current => [...current, response.data.data[0]])
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, []);
    console.log(movies);

    return (
        <div className="User-playlist">
            <h2>Watchlist</h2>
            <div className="User-movies">
                <Carousel show={8}>
                    {movies.map((movie) => (
                        <Link to={"/detail/" + movie.id}>
                            <div className="User-poster-wrapper" key={movie.title}>
                                <img className="User-poster" src={getPosterURL(movie.poster_path)} alt="poster"/>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default WatchList;
