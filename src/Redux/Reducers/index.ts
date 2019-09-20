import { combineReducers } from 'redux';
import { MainReducer } from './Main';

export const Reducers = {
    Main: MainReducer,
};

export default combineReducers(Reducers);
