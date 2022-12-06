import { medium_size } from "../../config/config";
import TransitionsModal from "../Modal/Modal";
import PropTypes from "prop-types";

const GalleryItem = ({ id, poster, title, date, media_type, vote_average }) => {
  GalleryItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    media_type: PropTypes.string,
    vote_average: PropTypes.string,
  };
  return (
    <TransitionsModal media_type={media_type} id={id}>
      <img className="poster" src={`${medium_size}/${poster}`} alt={title} />
    </TransitionsModal>
  );
};
 
export default GalleryItem;
