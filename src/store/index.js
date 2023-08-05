import { legacy_createStore as createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';

import userReducer from './reducers/userReducer'
import todoReducer from './reducers/todoReducer'

const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer
})

const persistConfig = {
    key: 'root',
    storage:session,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
