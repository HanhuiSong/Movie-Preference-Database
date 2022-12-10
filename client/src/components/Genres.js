import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
}) => {
  Genres.propTypes = {
    selectedGenres: PropTypes.string,
    setSelectedGenres: PropTypes.string,
    genres: PropTypes.string,
    setGenres: PropTypes.string,
  };
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=7f1b753fb62d68c35e35cf8905c6ec7c&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            color="success"
            label={genre.name}
            size="large"
            key={genre.id}
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            color="primary"
            label={genre.name}
            size="small"
            variant="filled"
            key={genre.id}
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
