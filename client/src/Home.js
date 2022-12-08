import axios from "axios";
import { useState, useEffect } from "react";
import GalleryItem from "./components/Gallery/GalleryItem";
import "./Home.css";
import Genres from "./components/Genres";
import useGenres from "./hooks/useGenres";
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreURL = useGenres(selectedGenres);

  const fetchGallery = async () => {
    const { data } = await axios.get(
    //   `http://localhost:4000/api/movies?limit=20`
      `https://api.themoviedb.org/3/discover/movie/?api_key=7f1b753fb62d68c35e35cf8905c6ec7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&limit=20`
    );
    // console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line
  }, [genreURL]);

  return (
    <div>
      <header/>
      {/* <div className="pageTitle">
        <Link to="/search" className="linkStyle">
          <pre> Search Movies </pre>
        </Link>
      </div> */}

      <div className="pageTitle">
        Movies
      </div>
      <div className="gallarymovies">
        {content.slice(0,10) &&
          content.map((c) => (
            <GalleryItem
              key={c.id}
              id={c.id}
              poster={"https://image.tmdb.org/t/p/w300/"+c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <div className="pageTitle">
        TV
      </div>
      <div className="gallarymovies">
        {content &&
          content.map((c) => (
            <GalleryItem
              key={c.id}
              id={c.id}
              poster={"https://image.tmdb.org/t/p/w300/"+c.poster_path}
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
