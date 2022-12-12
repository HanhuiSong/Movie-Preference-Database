// import {small_size} from "../../config/config";
// import TransitionsModal from "../Modal/Modal";
import PropTypes from "prop-types";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const GalleryItem = ({id, poster, title, date, media_type, vote_average}) => {
    GalleryItem.propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        media_type: PropTypes.string,
        vote_average: PropTypes.number,
    };
    // return (
    //     <div>
    //         <a href={"/detail/" + id}>
    //             <img className="poster" src={poster} size={small_size} alt={title}/>
    //         </a>
    //         <div>{title}</div>
    //     </div>

    // );
    return (
        <Card sx={{ m:2, width: 250}} variant = "cotained" style={{backgroundColor: "#202020"}}>
          <CardActionArea href={"/#/detail/" + id}>
            <CardMedia
              component="img"
              height="330"
              image={poster}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color = "orange">
                {title}
              </Typography>
              <Typography variant="body2" color="secondary">
                {vote_average}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
  );
};

export default GalleryItem;
