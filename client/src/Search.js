import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GalleryItem from "./components/Gallery/GalleryItem";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

require('./Home.css');


export default function GalleryView() {
    const [imagesUrl, setImageUrl] = useState([]);
    const [name, setName] = useState("");
    const [method, setMethod] = useState(0);
    const [order, setOrder] = useState(0);
    console.log(name);
    async function getSearchResults(){
        await axios.get('https://intense-bastion-25012.herokuapp.com/api/movies/' + name + '?limit=20')
        .then((response) => {
            setImageUrl(response.data);
        })
        .catch(error => {
            console.log(error);
            setImageUrl([]);
        })
    }
    useEffect(() => {
        getSearchResults();
        // eslint-disable-next-line
    }, [name]);


    function handleChange(event) {
        setName(event.target.value);
    }

    let a = imagesUrl;

    if (a.data !== undefined && method === 0) {
        if (order === 0) {
            a.data.sort((c, d) => c.title.localeCompare(d.title));
        } else {
            a.data.sort((c, d) => d.title.localeCompare(c.title));
        }
    } else if (a.data !== undefined && method === 1) {
        if (order === 0) {
            a.data.sort((c, d) => c.release_date.slice(0,4) - d.release_date.slice(0,4));
            console.log(a);
        } else {
            a.data.sort((c, d) => d.release_date.slice(0,4)  - c.release_date.slice(0,4));
            console.log(a);
        }
    }

    return (
        <div>
            <input className='input' placeholder='Search By Title' onChange={
                handleChange
            }/>
            <div className='buttons'>
            <DropdownButton id="dropdown-basic-button" title={method === 0 ? "Sorting by Title" : "Sorting by Year"}>
                <Dropdown.Item onClick={() => {
                    setMethod(0)
                }}>By Title</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setMethod(1)
                }}>By Year</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button1" title={order === 0 ? "Ascending" : "Descending"}>
                <Dropdown.Item onClick={() => {
                    setOrder(0)
                }}>Ascending</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setOrder(1)
                }}>Descending</Dropdown.Item>
            </DropdownButton>
            </div>
            <div className="pageTitle">
                Search result(s)
            </div>
            <div className="gallarymovies">
                {a.data &&
                    a.data.map((c) => (
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
}
