import React from 'react';
import { IPlayer } from '../../../../reducers/competitions/models';
import { CenteredGrid } from '../../../../components/centered-grid';
import TextField from '@material-ui/core/TextField/TextField';

interface ITeam {
    team: IPlayer[];
    setScore : (score: string) => void;
    score: string;
}

export const Team = (props: ITeam) => {
    const players = props.team.map((player: IPlayer) => <div key={player.name}>{player.name}</div>);
    const setScoreFromEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setScore(event.target.value);
    };
    return (
        <CenteredGrid>
            {players}
            <TextField required id="standard-required" label="Score" onChange={setScoreFromEvent} value={props.score}/>
        </CenteredGrid>
    );
}