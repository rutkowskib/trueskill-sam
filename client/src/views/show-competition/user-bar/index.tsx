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
    const rating = (props.player.mu - 3 * props.player.sigma).toFixed(3);
    return (
        <div>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={onChange}
            />
            {props.player.name} {rating} {props.player.mu} {props.player.sigma}
        </div>
    );
};
