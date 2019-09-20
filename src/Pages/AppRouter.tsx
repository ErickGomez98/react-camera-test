import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import MainPage from './MainPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <main className='Main'>
                <Route path='/'><MainPage /></Route>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter;