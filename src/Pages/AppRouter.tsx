import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainPage from './MainPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <main className='Main'>
                <Switch>
                    <Route path='/success-redirect'><h1>Success Page</h1></Route>
                    <Route path='/' exact ><MainPage /></Route>
                    <Route path='*'><Redirect to='/' /></Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter;