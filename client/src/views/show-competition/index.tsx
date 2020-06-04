import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompetition, getGame } from '../../actions/competitions';
import { IStore } from '../../reducers';
import { IPlayer } from '../../reducers/competitions/models';
import { UserBar } from './user-bar';
import Button from '@material-ui/core/Button';
import { CenteredGrid } from '../../components/centered-grid';
import { GeneratedGame } from './generated-game';
import { Spinner } from '../../components/spinner';

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
    const countRating = (player: IPlayer): number => player.mu - 3 * player.sigma;
    const players = competition.users
        .sort((player1: IPlayer, player2: IPlayer) => countRating(player2) - countRating(player1))
        .map((player: IPlayer) => (
        <UserBar
            key={player.name}
            player={player}
            isSelected={(checkboxes as any)[player.name] || false}
            setCheckbox={createSetCheckbox(player.name)}
        />
    ));
    const pending = useSelector((state: IStore) => {
        const { getGamePending, rateGamePending, fetchCompetitionPending } = state.competitions;
        return getGamePending || rateGamePending || fetchCompetitionPending;
    });
    return (
        <CenteredGrid>
            {pending && <Spinner />}
            {competition.name}
            <Link to={`/competition/${id}/add-user`}>
                Add user
            </Link>
            <form onSubmit={onSubmit}>
                {players}
                <Button variant="contained" color="primary" type="submit">
                    Generate game
                </Button>
            </form>
            <GeneratedGame />
        </CenteredGrid>
    );
};
