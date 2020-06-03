import { IStore, createReducers } from '../reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

export function configureStore(): Store<IStore> {
    const middlewares = [ thunk, logger ];
    const store = createStore(createReducers(), applyMiddleware(...middlewares)) as Store<IStore>;
    return store;
}
