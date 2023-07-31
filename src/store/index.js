import { legacy_createStore,combineReducers } from 'redux';
import userReducer from './reducers/userReducer'
import todoReducer from './reducers/todoReducer'

const rootReducer = combineReducers({
    user:userReducer,
    todo:todoReducer
})

const store = legacy_createStore(rootReducer);
export default store;
