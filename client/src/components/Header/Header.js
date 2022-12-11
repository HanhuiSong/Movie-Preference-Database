import "./Header.css";
import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
// import { IconButton } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionsTypes';

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default" style={{ background: '#D3DA9A' }}>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to={"/"}>Home</Link>
                    </Typography>

                    <Button href={"/#/search"}>Search</Button>
                    {user?.result ? (
                        <div className='profile'>
                            <Link to={"/user/" + user?.result.username}>
                                <Avatar className='purple' alt={user?.result.username} src={user?.result.imageUrl}>
                                    {Array.from(user?.result.username)[0].toUpperCase()}
                                </Avatar>
                            </Link>
                            <Typography className='username' variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className='logout' color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
