import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

require('./App.css');


export default function GalleryView() {
    const [imagesUrl, setImageUrl] = useState([]);
    const [name, setName] = useState("");
    const [method, setMethod] = useState(0);
    const [order, setOrder] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:4000/api/movies/'+name+'?limit=20')
            .then((response) => {
            setImageUrl(response.data);
            })
            .catch(error=>{
                console.log(error);
                setImageUrl([]);
            })
    }, [name,imagesUrl]);


    function handleChange(event) {
        setName(event.target.value);
    }
    let a = imagesUrl;

    if (a.data !== undefined && method === 0) {
        if (order===0) {
            a.data.sort((c, d) => c.title.localeCompare(d.title));
        }else{
            a.data.sort((c, d) => d.title.localeCompare(c.title));
        }
    } else if (a.data !== undefined && method === 1) {
        if (order===0) {
            a.data.sort((c, d) => c.release_date.slice(0,4)-d.release_date.split(0,4));
        }else {
            a.data.sort((c, d) => d.release_date.split(0,4)-c.release_date.split(0,4));
        }
    }

    return (
        <div>
            <input className='input' placeholder='Type title or overview' onChange={
                handleChange
            }/>
            <DropdownButton id="dropdown-basic-button" title={method===0?"Sorting by Title":"Sorting by Year"}>
                <Dropdown.Item onClick={()=>{setMethod(0)}}>By Title</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setMethod(1)}}>By Year</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button1" title={order===0?"Ascending":"Descending"}>
                <Dropdown.Item onClick={()=>{setOrder(0)}}>Ascending</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setOrder(1)}}>Descending</Dropdown.Item>
            </DropdownButton>
            <div className='poke'>
                {
                    a.data ? a.data.map(
                        (species) => {
                            return <div>
                                <div className="gallery1">
                                    <a href={"/#/detail/" + species._id}>
                                        <div key={species.title}>{species.title}</div>
                                        <img id="pic"
                                             src={"https://image.tmdb.org/t/p/w300/"+species.poster_path}/>
                                    </a>
                                </div>
                            </div>
                        }
                    ) : <></>

                }
            </div>
        </div>
    );
}
