import { small_size } from "../../config/config";
import "./ListItem.css";
import TransitionsModallist from "../Modal/ModalList";
import PropTypes from "prop-types";

const ListItem = ({ id, poster, title, date, media_type, vote_average }) => {
  ListItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    media_type: PropTypes.string,
    vote_average: PropTypes.string,
  };
  return (
    <TransitionsModallist media_type={media_type} id={id}>
      <img className="poster" src={`${small_size}/${poster}`} alt={title} />
      <b className="title">{title}</b>
      <b className="date">Release Date: {date}</b>
      <b className="vote_average">Rating: {vote_average}</b>
    </TransitionsModallist>
  );
};  

export default ListItem;
