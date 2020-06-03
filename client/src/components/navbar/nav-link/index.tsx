import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface INavLink {
    text: string;
    to: string;
}

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));


export const NavLink = (props: INavLink) => {
    const classes = useStyles();
    return (
        <Typography variant="h6" className={classes.title}>
            <RouterLink to={props.to}>
                {props.text}
            </RouterLink>
        </Typography>
    );
};

