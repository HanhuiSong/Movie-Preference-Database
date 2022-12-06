import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Modal.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PropTypes from "prop-types";

function TransitionsModal({ children, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  TransitionsModal.propTypes = {
    id: PropTypes.number,
  };
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7f1b753fb62d68c35e35cf8905c6ec7c&language=en-US`
    );

    setContent(data);
  };
  const fetchPrev = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=7f1b753fb62d68c35e35cf8905c6ec7c&language=en-US`
    );

    setContent(data.results[Math.floor(Math.random() * (19 - 1 + 1)) + 1]);
  };
  const fetchNext = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=7f1b753fb62d68c35e35cf8905c6ec7c&language=en-US`
    );

    setContent(data.results[Math.floor(Math.random() * (19 - 1 + 1)) + 1]);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box className="sx">
              <div className="buttons">
                <Button variant="contained" onClick={() => fetchPrev()}>
                  <ArrowBackIosNewRoundedIcon />
                </Button>
                <Button variant="contained" onClick={() => fetchNext()}>
                  <ArrowForwardIosRoundedIcon />
                </Button>
              </div>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {content.title}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <span>Rating:{content.vote_average}</span>
                <br></br>
                <br></br>
                <span>
                  Overview:
                  <br></br>
                  {content.overview}
                </span>
              </Typography>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}

export default TransitionsModal;
