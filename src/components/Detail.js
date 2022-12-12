import React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
const axios = require('axios');

const GET_DETAIL_API = "https://intense-bastion-25012.herokuapp.com/api/detail/";
const GET_RELETIVE_API = "https://intense-bastion-25012.herokuapp.com/api/reletive/";
const IMG_API = "https://image.tmdb.org/t/p/w500";
const savedUser = JSON.parse(localStorage.getItem('profile'));
const username = savedUser === null ? null : savedUser.result.username;
// const username = "jonwick"
const USER_INFO_API = `https://intense-bastion-25012.herokuapp.com/api/users?where={"username": "${username}"}`
const USER_UPDATE_API = "https://intense-bastion-25012.herokuapp.com/api/users/"

let favorited = false;
const generalMap = new Map([
    [28, "Action"],
    [12, "Adventure"],
    [16, "Animation"],
    [35, "Comedy"],
    [80, "Crime"],
    [99, "Documentary"],
    [18, "Drama"],
    [10751, "Family"],
    [14, "Fantasy"],
    [36, "History"],
    [27, "Horror"],
    [10402, "Music"],
    [9648, "Mystery"],
    [10749, "Romance"],
    [878, "Science Fiction"],
    [10770, "TV Movie"],
    [53, "Thriller"],
    [10752, "War"],
    [37, "Western"]

]);

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

let myGenre = [];
let reletiveGenreId;
let date;
// movieId
export default function Detail() {
    const [movie, setMovie] = React.useState({});
    const [user, setUser] = React.useState({})
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [reletiveMovies, setReletiveMovies] = React.useState({});

    const movieId = document.URL.split('/').pop();
    const singleMovieUrl = GET_DETAIL_API + movieId;
    let favList = [];
    async function getMovieDetailAPT() {
        await axios.get(singleMovieUrl).then((Response) => {
            const obj = Response.data.data;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    try {
                        const element = obj[key];
                        const map1 = new Map(
                            [...generalMap]
                                .filter(([k, v]) => element.genre_ids.includes(k)
                                ));
                        myGenre = Array.from(map1.values());
                        reletiveGenreId = element.genre_ids[0];
                        date = new Date(element.release_date).toDateString().split(' ').slice(1).join(' ');
                        setMovie(element);
                        setIsLoaded(false);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("no key");
                }
            }
            return axios.get(GET_RELETIVE_API + reletiveGenreId)
        }).then(Response => {
            const obj = Response.data.data;
            setReletiveMovies(obj);
        });
    }

    async function getUserInfo() {
        await axios.get(USER_INFO_API).then(Response => {
            const obj = Response.data.data[0];
            setUser(obj);
            favList = obj.playList;
            if (favList.includes(movieId)) {
                favorited = true;
            } else {
                favorited = false;
            }
        });
    }

    async function updateUserInfo(favList) {
        let data = {
            playList: favList
        };

        await axios({
            method: 'put',
            url: USER_UPDATE_API + user._id,
            data: data
        }).then(function (response) {
            window.location.reload();
        });
    }


    const handleOnclick = () => {
        if (username !== undefined && username !== null) {
            if (favorited) {
                let data = user.playList;
                data = user.playList.filter((item) => item !== movieId);
                updateUserInfo(data);
                favorited = false;


            } else {
                let data = user.playList;
                data.push(movieId);
                updateUserInfo(data);
                favorited = true;
            }
        } else {
            alert("Please login to use this feature");
        }

    }
    useEffect(() => {
        getMovieDetailAPT();
        if (username !== undefined && username !== null) {
            getUserInfo();
            if (favList.includes(movieId)) {
                favorited = true;
            }
        }
        // eslint-disable-next-line
    }, [singleMovieUrl, reletiveGenreId, favorited]);

    if (isLoaded) {
        return <div>Loading...</div>;
    }



    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 200, height: 330 }}>
                        <Img alt="complex" src={IMG_API + movie.poster_path} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item container direction="column" align="left" sx={{ height: 330 }} justifyContent="space-between">
                        <Grid item>
                            <p>Title: {movie.title}</p>
                        </Grid>
                        <Grid item>
                            <p>Genre: {myGenre.map(txt => <span key={txt}>{txt}&nbsp;&nbsp;</span>)}</p>
                        </Grid>
                        <Grid item>
                            <p> Original Language: {movie.original_language}</p>
                        </Grid>
                        <Grid item>
                            <p>Adult: {movie.adult ? "True" : "False"}</p>
                        </Grid>
                        <Grid item>
                            <p>Release Date: {date}</p>
                        </Grid>
                        <Grid item>
                            <p>Popularity: {movie.popularity}</p>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" flexItem>
                </Divider>
                <Grid item xs={4} container direction="column" justifyContent="center" sx={{ height: 330 }}>
                    <div>
                        <p>Rating: {movie.vote_average}</p>
                        <Rating name="read-only" value={Number(movie.vote_average)} precision={0.5} max={10} readOnly />
                        <p>Favorite:
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleOnclick}>
                                {favorited ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
                                {/* <FavoriteBorderIcon></FavoriteBorderIcon> */}
                            </IconButton>
                        </p>
                    </div>
                </Grid>
            </Grid>

            <Divider></Divider>
            <Grid item xs container direction="column" align="left">
                <Grid item>
                    <h1>Description: </h1>
                </Grid>
                <Grid item>
                    {movie.overview}
                </Grid>
            </Grid>

            <Grid item container direction="column" align="left">
                <Grid item>
                    <h1>Reletive Movies: </h1>
                </Grid>
                <Grid item sm container justifyContent="space-around" sx={{ height: 330 }}>
                    {Array.isArray(reletiveMovies) ?
                        reletiveMovies.map((movie, index) => {
                            return (
                                <Grid item key={index}>
                                    <ButtonBase sx={{ width: 100, height: 230 }}>
                                        <a href={"/movie-database-final-project/#/detail/" + movie._id}>
                                            <Img alt="complex" src={IMG_API + movie.poster_path} key={movie.id} />
                                        </a>
                                    </ButtonBase>
                                </Grid>
                            )
                        }) : null}

                </Grid>
            </Grid>
        </div>
    )
}
