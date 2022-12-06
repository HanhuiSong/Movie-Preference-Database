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
      `https://api.themoviedb.org/3/discover/movie/?api_key=7f1b753fb62d68c35e35cf8905c6ec7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreURL}`
    );
    console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line
  }, [genreURL]);

  return (
    <div>
      <span className="pageTitle">
        <Link to="/" className="linkStyle">
          <pre> Filter </pre>
        </Link>
        <Link to="/search" className="linkStyle">
          <pre> Search </pre>
        </Link>
      </span>

      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
      />
      <div className="gallarymovies">
        {content &&
          content.map((c) => (
            <GalleryItem
              key={c.id}
              id={c.id}
              poster={c.poster_path}
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
