import "./Header.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="default" style={{background: '#D3DA9A'}}>
                <Toolbar>

                    <Typography  variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to={"/"}>Home</Link>
                    </Typography>

                    <Button href={"/#/search"}>Search</Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

