import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../containers/Login';
import noRequireAuth from '../containers/noRequireAuth';
import requireAuth from '../containers/requireAuth';
import Calendar from '../containers/Calendar';
import NotFoundPage from '../components/NotFoundPage';


export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/calendar" component={requireAuth(Calendar)} />
    <Route exact path="/login" component={noRequireAuth(Login)} />
    <Route component={NotFoundPage} />
  </Switch>
);
