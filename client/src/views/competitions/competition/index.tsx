import React from 'react';

interface ICompetition {
    name: string;
}

export const Competition = (props: ICompetition) => (
    <div>
        {props.name}
    </div>
);
