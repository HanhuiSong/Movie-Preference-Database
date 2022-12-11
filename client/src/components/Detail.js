import React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
const axios = require('axios');

const GET_DETAIL_API = "http://127.0.0.1:4000/api/detail/";
const GET_RELETIVE_API = "http://127.0.0.1:4000/api/reletive/";
const IMG_API = "https://image.tmdb.org/t/p/w500";

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
// movieId
export default function Detail() {
    const [movie, setMovie] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [reletiveMovies, setReletiveMovies] = React.useState({});
    const movieId = document.URL.split('/').pop();
    

    function getMovieDetailAPT() {
        axios.get(GET_DETAIL_API + movieId).then((Response) => {            
            const obj = Response.data.data;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    try {
                        // console.log("getMovieDetailAPT: ");
                        const element = obj[key];
                        setMovie(element);
                        setIsLoaded(false);
                        const map1 = new Map(
                            [...generalMap]
                                .filter(([k, v]) => movie.genre_ids.includes(k)
                                ));
                        myGenre =  Array.from(map1.values());
                        reletiveGenreId = movie.genre_ids[0];
                        // console.log("reletiveGenreId: " + reletiveGenreId);
                        
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("no key");
                }
            }
        }).then(res2 => {
            getReletiveAPT();
        });
    }

    function getReletiveAPT() {
        axios.get(GET_RELETIVE_API + reletiveGenreId).then((Response) => {
            try {
                const obj = Response.data.data;
                setReletiveMovies(obj);
                console.log("getReletiveAPT: " + obj);
            } catch (error) {
                console.log(error);
            }

        });
    }

    useEffect(() => {
        getMovieDetailAPT();
        
    }, [movieId, reletiveGenreId, movie.genre_ids  ]);

    
    if (isLoaded) {
        return <div>Loading...</div>;
    }

    // console.log("reletiveMovies: " + reletiveMovies);
    

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
                            <p>Genre: {myGenre.map(txt => <span>{txt}&nbsp;&nbsp;</span>)}</p>
                        </Grid>
                        <Grid item>
                            <p> Original Language: {movie.original_language}</p>
                        </Grid>
                        <Grid item>
                            <p>Adult: {movie.adult ? "True" : "False"}</p>
                        </Grid>
                        <Grid item>
                            <p>Release Date: {movie.release_date}</p>
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
                        <p>Rating: </p>
                        <Rating name="read-only" value={Number(movie.vote_average)} precision={0.5} max={10} readOnly />
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
                        reletiveMovies.map((movie) => {
                        return (
                            <Grid item>
                                <ButtonBase sx={{ width: 100, height: 230 }}>
                                <a href={"/#/detail/" + movie._id}>
                                    <Img alt="complex" src={IMG_API + movie.poster_path} />
                                    </a>
                                </ButtonBase>
                            </Grid>
                        )
                    }): null}

                </Grid>
            </Grid>

        </div>
    )
}
