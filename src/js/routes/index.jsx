import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import noRequireAuth from '../containers/noRequireAuth';
import requireAuth from '../containers/requireAuth';
import Calendar from '../containers/Calendar';
import NotFoundPage from '../components/NotFoundPage';


export default (
  <Switch>
    <Route exact path="/calendar" component={requireAuth(Calendar)} />
    <Route exact path="/login" component={noRequireAuth(LoginPage)} />
    <Route component={NotFoundPage} />
  </Switch>
);
