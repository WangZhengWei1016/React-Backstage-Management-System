import React,{Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

import Admin from './pages/Admin/Admin'
import Login from './pages/Login/Login'

export default class App extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Admin} />
                </Switch>
            </HashRouter>
        )
    }
}