import axios from "axios";
import {useState, useEffect} from "react";
import GalleryItem from "./components/Gallery/GalleryItem";
import "./Home.css";
// import Genres from "./components/Genres";
// import useGenres from "./hooks/useGenres";

const Home = () => {
    const [content, setContent] = useState([]);
    // const [selectedGenres, setSelectedGenres] = useState([]);
    // const [genres, setGenres] = useState([]);
    // const genreURL = useGenres(selectedGenres);


    useEffect(() => {
        axios.get('https://glacial-journey-32972.herokuapp.com/api/movies?limit=20')
            .then((response) => {
                setContent(response.data);
            })
            .catch(error => {
                console.log(error);
                setContent([]);
            })
    }, []);
    // }, [content]);

    return (
        <div>
            <header/>
            <div className="pageTitle">
                In Theatre
            </div>
            <div className="gallarymovies">
                {content.data &&
                    content.data.slice(12, 24).map((c) => (
                        <GalleryItem
                            key={c.id}
                            id={c._id}
                            poster={"https://image.tmdb.org/t/p/w300/" + c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            <div className="pageTitle">
                On Demand
            </div>
            <div className="gallarymovies">
                {content.data &&
                    content.data.slice(0, 12).map((c) => (
                        <GalleryItem
                            key={c.id}
                            id={c._id}
                            poster={"https://image.tmdb.org/t/p/w300/" + c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Home;
