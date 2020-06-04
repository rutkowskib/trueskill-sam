import { combineReducers } from 'redux';
import { reducer as competitions } from './competitions';
import { ICompetitionsReducer } from './competitions/models';

export interface IStore {
    competitions: ICompetitionsReducer;
}

export const createReducers = () => combineReducers({
    competitions
});
