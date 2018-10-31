import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/content/Home';
import Signin from '../containers/content/Signin';
import noRequireAuth from '../hoc/noRequireAuth';
import requireAuth from '../hoc/requireAuth';
import Calendar from '../containers/content/Calendar';
import NotFoundPage from '../components/content/NotFoundPage';
import paths from '../paths';

const { main, calendar, signin } = paths;

export default (
  <Switch>
    <Route exact path={main} component={Home} />
    <Route exact path={calendar} component={requireAuth(Calendar)} />
    <Route exact path={signin} component={noRequireAuth(Signin)} />
    <Route component={NotFoundPage} />
  </Switch>
);
