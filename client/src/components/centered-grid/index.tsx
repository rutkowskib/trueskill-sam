import React from 'react';
import './index.css';

interface ICenteredGrid {
    children: React.ReactNode
}

export const CenteredGrid = (props: ICenteredGrid) => {
    return (
        <div className="centered-grid">
            {props.children}
        </div>
    );
}