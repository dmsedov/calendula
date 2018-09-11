import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/content/Home';
import Login from '../containers/content/Login';
import noRequireAuth from '../hoc/noRequireAuth';
import requireAuth from '../hoc/requireAuth';
import Calendar from '../containers/content/Calendar';
import NotFoundPage from '../components/content/NotFoundPage';


export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/calendar" component={requireAuth(Calendar)} />
    <Route exact path="/login" component={noRequireAuth(Login)} />
    <Route component={NotFoundPage} />
  </Switch>
);
