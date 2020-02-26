import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Tickets from './components/Tickets/Tickets';
// import Map from './components/Map/Map';

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/bookmarks' component={Bookmarks} />
        <Route path='/tickets' component={Tickets} />
        {/* <Route path='/map' component={Map} /> */}
    </Switch>
)