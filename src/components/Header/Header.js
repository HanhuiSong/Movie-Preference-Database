import "./Header.css";
import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionsTypes';

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        window.location.href = window.location.href.split('/#')[0];
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line
    }, [location]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary" style={{ background: '#202020' }}>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                        <Button id='title' href={"/movie-database-final-project/"}>Movie Preference Database</Button>
                    </Typography>

                    <Button id='title1' href={"/movie-database-final-project/#/search"}>Search</Button>

                    {user?.result ? (
                        <div className='profile'>
                            <Link to={"/user/" + user?.result.username}>
                                <Avatar className='purple' alt={user?.result.username} src={user?.result.imageUrl}>
                                    {Array.from(user?.result.username)[0].toUpperCase()}
                                </Avatar>
                            </Link>
                            <Typography className='username' variant="h6">{user?.result.name}</Typography>
                            <Button
                                variant="contained"
                                className='logout'
                                color="secondary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button variant="contained" color="secondary" href={"/movie-database-final-project/#/auth"}>Log In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
