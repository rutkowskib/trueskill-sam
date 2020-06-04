import { createAsyncActionConstants } from '../util';

export const COMPETITIONS_ACTION_TYPES = {
    FETCH_COMPETITIONS: createAsyncActionConstants('FETCH_COMPETITIONS'),
    CREATE_COMPETITION: createAsyncActionConstants('CREATE_COMPETITION'),
    FETCH_COMPETITION: createAsyncActionConstants('FETCH_COMPETITION'),
    GET_GAME: createAsyncActionConstants('GET_GAME'),
    RATE_GAME: createAsyncActionConstants('RATE_GAME'),
    CREATE_USER: createAsyncActionConstants('CREATE_USER'),
};
