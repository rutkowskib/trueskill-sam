import React from 'react';
import { NavLink } from './nav-link';

export const Navbar = () => {
    return (
        <div>
            <NavLink
                text="Competitions"
                to="/"
            />
            <NavLink
                text="Create Competition"
                to="/create-competition"
            />
        </div>
    );
}