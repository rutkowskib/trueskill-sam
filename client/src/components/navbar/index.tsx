import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from './nav-link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink
                        text="Competitions"
                        to="/"
                    />
                    <NavLink
                        text="Create Competition"
                        to="create-competition"
                    />
                </Toolbar>
            </AppBar>
        </div>
    );
}