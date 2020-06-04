import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../actions/competitions';
import { RouteComponentProps } from 'react-router-dom';
import { INewPlayer } from '../../reducers/competitions/models';
import { Spinner } from '../../components/spinner';
import { IStore } from '../../reducers';

export const CreateUser = (props: RouteComponentProps<{ id: string }>) => {
    const [ player, setPlayer ] = useState({ name: '', mu: 25.0, sigma: '8.33' });
    const dispatch = useDispatch();
    const onSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        dispatch(createUser({
            ...player,
            competitionName: props.match.params.id
        } as unknown as INewPlayer));
    };
    const isPending = useSelector((state: IStore) => state.competitions.createUserPending);
    const setPlayerValue = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => setPlayer({ ...player, [field]: event.target.value });
    return (
        <form onSubmit={onSubmit}>
            {isPending && <Spinner />}
            <TextField required id="standard-required" label="Name" value={player.name} onChange={setPlayerValue('name')} />
            <TextField required id="standard-required" label="Mu" value={player.mu} onChange={setPlayerValue('mu')} />
            <TextField required id="standard-required" label="Sigma" defaultValue={player.sigma} onChange={setPlayerValue('sigma')} />
            <Button variant="contained" color="primary" type="submit">
                Add user
            </Button>
        </form>
    );
}
