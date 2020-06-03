import React from 'react';
import { IPlayer } from '../../../reducers/competitions/models';

interface IUserBar {
    player: IPlayer;
    isSelected: boolean;
    setCheckbox: (selected: boolean) => void;
}

export const UserBar = (props: IUserBar) => {
    const onChange = (event: any) => {
        props.setCheckbox(event.target.checked);
    };
    return (
        <div>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={onChange}
            />
            {props.player.name}
        </div>
    );
};
