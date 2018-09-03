import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import PrivateRoutes from '../components/PrivateRoutes';
import LoginPage from '../containers/LoginPage';
// import Calendar from '../containers/Calendar';
// import NotFoundPage from '../components/NotFoundPage';
// <Route component={NotFoundPage} />
export default (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
  </Switch>
);
