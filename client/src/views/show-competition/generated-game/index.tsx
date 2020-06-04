import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../reducers';
import { Team } from './team';
import './index.css'
import { IPlayer } from '../../../reducers/competitions/models';
import Button from '@material-ui/core/Button';
import { rateGame } from '../../../actions/competitions';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const _GeneratedGame = (props: RouteComponentProps<{id: string}>) => {
    const [ scores, setScores ] = useState([ '', '' ]);
    const dispatch = useDispatch();
    const game = useSelector((state: IStore) => state.competitions.game);
    const teams = game.teams.map((team: IPlayer[], index: number) => {
        const setScore = (score: string) => {
            const newScores = scores;
            newScores[index] = score;
            setScores([...newScores]);
        };
        return (
            <Team
                team={team}
                key={Math.floor(Math.random() * 10000000)}
                setScore={setScore}
                score={scores[index]}
            />
        );
    });
    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const teams = scores[0] > scores[1] ? [ game.teams[0], game.teams[1] ] : [ game.teams[1], game.teams[0] ];
        const teamsWithOnlyNames = teams.map((team: IPlayer[]) => team.map((player: IPlayer) => player.name));
        dispatch(rateGame(props.match.params.id, teamsWithOnlyNames));
    };
    return (
        <form className="generated-game" onSubmit={onSubmit}>
            <div className="teams">
                {teams}
            </div>
            <div>
                {teams.length ? <Button variant="contained" color="primary" type="submit">
                    Submit score
                </Button> : undefined}
            </div>
        </form>
    );
}

export const GeneratedGame = withRouter(_GeneratedGame);