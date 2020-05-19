import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = (isAuth) => {
    if (isAuth) {
        // TODO: Made 404 redirect if none of thoose roures has worked.
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                
            </Switch>
        )
    }
    
    // TODO: Made 404 redirect if none of thoose roures has worked.
    return (
        <Switch>
            <Route to="/" exact>
                <AuthPage />
            </Route>
        </Switch>
    )

}