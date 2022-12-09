import {small_size} from "../../config/config";
// import TransitionsModal from "../Modal/Modal";
import PropTypes from "prop-types";

const GalleryItem = ({id, poster, title, date, media_type, vote_average}) => {
    GalleryItem.propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        media_type: PropTypes.string,
        vote_average: PropTypes.string,
    };
    return (
        <div>
            <a href={"/#/detail/" + id}>
                <img className="poster" src={poster} size={small_size} alt={title}/>
            </a>
            <div>{title}</div>
        </div>

    );
};

export default GalleryItem;
