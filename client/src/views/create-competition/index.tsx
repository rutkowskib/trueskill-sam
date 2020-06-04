import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { createCompetition } from '../../actions/competitions';

export const CreateCompetition = () => {
    const [ name, setName ] = useState('');
    const dispatch = useDispatch();
    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(createCompetition({ name }));
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    return (
        <form onSubmit={onSubmit}>
            <TextField required id="standard-required" label="Name" value={name} onChange={onChange} />
            <Button variant="contained" color="primary" type="submit">
                Add competition
            </Button>
        </form>
    );
};
