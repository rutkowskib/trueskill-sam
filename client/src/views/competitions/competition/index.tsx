import React from 'react';
import { Link } from 'react-router-dom';

interface ICompetition {
    name: string;
}

export const Competition = (props: ICompetition) => (
    <Link to={`competition/${props.name}`}>
        {props.name}
    </Link>
);
