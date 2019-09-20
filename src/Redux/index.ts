import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const Reducers = rootReducers;

export default function configureStore() {
    return createStore(
        rootReducers,
        process.env.NODE_ENV === 'development' ?
            composeWithDevTools(applyMiddleware(thunk))
            :
            applyMiddleware(thunk)

    );
}
