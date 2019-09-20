import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import { Provider } from 'react-redux';
import AppRouter from './Pages/AppRouter';
import configureStore from './Redux';

ReactDOM.render(
    <Provider store={configureStore()}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);