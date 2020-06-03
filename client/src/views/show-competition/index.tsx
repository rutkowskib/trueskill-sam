import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompetition, getGame } from '../../actions/competitions';
import { IStore } from '../../reducers';
import { IPlayer } from '../../reducers/competitions/models';
import { UserBar } from './user-bar';
import Button from '@material-ui/core/Button';

export const ShowCompetition = (props: RouteComponentProps<{ id: string }>) => {
    const [ checkboxes, setCheckboxes ] = useState({});
    const { id } = props.match.params;
    const dispatch = useDispatch();
    const competition = useSelector((state: IStore) => state.competitions.competition);
    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const players = [];
        for (let [key, value] of Object.entries(checkboxes)) {
            if (value) {
                players.push(key);
            }
        }
        dispatch(getGame(id, players));
    };
    useEffect(() => {
        dispatch(fetchCompetition(id));
    }, [ id ]);
    useEffect(() => {
        const checkboxes = competition.users.reduce((prev, player: IPlayer) => ({ ...prev, [player.name]: false }), {});
        setCheckboxes(checkboxes);
    }, [ competition ]);
    const createSetCheckbox = (name: string) => (selected: boolean) => setCheckboxes({ ...checkboxes, [name]: selected });
    const players = competition.users.map((player: IPlayer) => (
        <UserBar
            key={player.name}
            player={player}
            isSelected={(checkboxes as any)[player.name] || false}
            setCheckbox={createSetCheckbox(player.name)}
        />
    ));
    return (
        <div>
            {competition.name}
            <form onSubmit={onSubmit}>
                {players}
                <Button variant="contained" color="primary" type="submit">
                    Primary
                </Button>
            </form>
        </div>
    );
};
