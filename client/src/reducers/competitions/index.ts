import { COMPETITIONS_ACTION_TYPES } from '../../actionTypes/competitions';
import { ICompetitionsReducer } from './models';

const defaultState: ICompetitionsReducer = {
    competitions: [],
    competition: {
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [],
    }
};

export const reducer = (state = defaultState, action: any): ICompetitionsReducer => {
    switch (action.type) {
        case COMPETITIONS_ACTION_TYPES.FETCH_COMPETITIONS.FULFILLED:
            return {
                ...state,
                competitions: action.competitions,
            };
        case COMPETITIONS_ACTION_TYPES.FETCH_COMPETITION.FULFILLED:
            return {
                ...state,
                competition: action.competition,
            };
        default:
            return state;
    }
};