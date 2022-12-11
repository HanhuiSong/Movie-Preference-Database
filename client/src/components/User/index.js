import React, {useState, useEffect} from "react";
import './styles.css';
import Carousel from "./Carousel";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import {Button} from '@material-ui/core';
import {useDispatch} from "react-redux";
import * as actionType from '../../constants/actionsTypes';


const getPosterURL = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`
}

let watchlist = [];

const savedUser = JSON.parse(localStorage.getItem('profile'));
const loginUsername = savedUser === null ? null : savedUser.result.username;

function User() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

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

    const deleteUser = async () => {
        await axios({
            method: "delete",
            url: `https://intense-bastion-25012.herokuapp.com/api/users/${user._id}`
        }).then(() => {
            dispatch({ type: actionType.LOGOUT });
            history.push('/');
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleOnClick = () => {
        if (loginUsername !== undefined && loginUsername !== null) {
            const deleteAccount = window.confirm("Are you sure you want to delete your account?");
            if (deleteAccount) {
                deleteUser();
            } else {
                window.location.reload();
            }
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className="User">
            <div className="User-info">
                <h1>{user.username}</h1>
                Email: {user.email}
            </div>
            <div className="User-playlist">
                <h2>Watchlist</h2>
                {(movies.length !== 0) ? (
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
                ) : (
                    <div>No movies in the watchlist.</div>
                )}
            </div>
            <Button className="User-delete" onClick={handleOnClick} color="default" variant="contained">
                Delete this account
            </Button>
        </div>
    );
}

export default User;
