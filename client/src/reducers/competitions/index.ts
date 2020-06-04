import { COMPETITIONS_ACTION_TYPES } from '../../actionTypes/competitions';
import { ICompetitionsReducer } from './models';

const defaultState: ICompetitionsReducer = {
    competitions: [],
    competition: {
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [],
    },
    game: {
        teams: []
    },
    createUserPending: false,
    rateGamePending: false,
    getGamePending: false,
    fetchCompetitionPending: false,
};

export const reducer = (state = defaultState, action: any): ICompetitionsReducer => {
    switch (action.type) {
        case COMPETITIONS_ACTION_TYPES.FETCH_COMPETITIONS.FULFILLED:
            return {
                ...state,
                competitions: action.competitions,
            };
        case COMPETITIONS_ACTION_TYPES.FETCH_COMPETITION.PENDING:
            return {
                ...state,
                fetchCompetitionPending: true,
            };
        case COMPETITIONS_ACTION_TYPES.FETCH_COMPETITION.FULFILLED:
            return {
                ...state,
                competition: action.competition,
                fetchCompetitionPending: false,
            };
        case COMPETITIONS_ACTION_TYPES.GET_GAME.PENDING:
            return {
                ...state,
                getGamePending: true,
            };
        case COMPETITIONS_ACTION_TYPES.GET_GAME.FULFILLED:
            return {
                ...state,
                game: action.game,
                getGamePending: false,
            };
        case COMPETITIONS_ACTION_TYPES.CREATE_USER.PENDING:
            return {
                ...state,
                createUserPending: true,
            };
        case COMPETITIONS_ACTION_TYPES.CREATE_USER.FULFILLED:
            return {
                ...state,
                createUserPending: false,
            };
        case COMPETITIONS_ACTION_TYPES.RATE_GAME.PENDING:
            return {
                ...state,
                rateGamePending: true,
            };
        case COMPETITIONS_ACTION_TYPES.RATE_GAME.FULFILLED:
            return {
                ...state,
                rateGamePending: false,
            };
        default:
            return state;
    }
};