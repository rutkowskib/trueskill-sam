import axios  from 'axios';
import { Dispatch } from 'redux';
import { COMPETITIONS_ACTION_TYPES } from '../actionTypes/competitions';
import { URLS } from '../urls';
import { passValueToUrl } from '../util';
import { IPlayer } from '../reducers/competitions/models';
import qs from 'qs';

export const fetchCompetitions = () => async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch({
        type: COMPETITIONS_ACTION_TYPES.FETCH_COMPETITIONS.PENDING,
    });
    try {
        const response = await axios.get(URLS.FETCH_COMPETITIONS);
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.FETCH_COMPETITIONS.FULFILLED,
            competitions: response.data,
        });
    } catch (error) {
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.FETCH_COMPETITIONS.REJECTED,
        });
        throw error;
    }
};

export const createCompetition = (competition: { name: string }) => async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch({
        type: COMPETITIONS_ACTION_TYPES.CREATE_COMPETITION.PENDING,
    });
    try {
        await axios.post(URLS.FETCH_COMPETITIONS, competition);
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.CREATE_COMPETITION.FULFILLED,
        });
    } catch (error) {
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.CREATE_COMPETITION.REJECTED,
        });
        throw error;
    }
};

export const fetchCompetition = (name: string) => async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch({
        type: COMPETITIONS_ACTION_TYPES.FETCH_COMPETITION.PENDING,
    });
    try {
        const response = await axios.get(passValueToUrl(URLS.FETCH_COMPETITION, name));
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.FETCH_COMPETITION.FULFILLED,
            competition: response.data,
        });
    } catch (error) {
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.FETCH_COMPETITION.REJECTED,
        });
        throw error;
    }
};

export const getGame = (competition: string, players: string[]) => async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch({
        type: COMPETITIONS_ACTION_TYPES.GET_GAME.PENDING,
    });
    try {
        const url = `competitions/${competition}/game?${qs.stringify({ players }, { arrayFormat: 'repeat' })}`;
        const response = await axios.get(url);
        console.log(response);
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.GET_GAME.FULFILLED,
        });
    } catch (error) {
        dispatch({
            type: COMPETITIONS_ACTION_TYPES.GET_GAME.REJECTED,
        });
    }
};