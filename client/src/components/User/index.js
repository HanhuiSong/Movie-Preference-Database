import React, {useState, useEffect} from "react";
import './styles.css';
import Carousel from "./Carousel";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const getPosterURL = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`
}

let watchlist = [];

function User() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [movies, setMovies] = useState([]);

    const getUser = async () => {
        try {
            await axios.get(`https://intense-bastion-25012.herokuapp.com/api/users?where={"username": "${username}"}`)
                .then((response) => {
                const obj = response.data.data[0];
                setUser(obj);
                watchlist = obj.playList;
            })
                .then(() => {
                    for (let movieId of watchlist) {
                        axios.get(`https://intense-bastion-25012.herokuapp.com/api/detail/${movieId}`)
                            .then((response) => {
                                setMovies(current => [...current, response.data.data[0]]);
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        let flag = true;
        getUser().then(() => {
            if (isMounted) flag = false;
        });
        return () => { isMounted = false };
    }, []);

    return (
        <div className="User">
            <div className="User-info">
                <h1>{user.username}</h1>
                Email: {user.email}
            </div>
            <div className="User-playlist">
                <h2>Watchlist</h2>
                <div className="User-movies">
                    <Carousel show={8}>
                        {movies.map((movie) => (
                            <div className="User-poster-wrapper" key={movie.title}>
                                <Link to={"/detail/" + movie._id}>
                                    <img className="User-poster" src={getPosterURL(movie.poster_path)} alt="poster"/>
                                </Link>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default User;
