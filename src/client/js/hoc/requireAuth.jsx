import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import paths from '../paths';

const { login } = paths;

export default (ComposedComponent) => {
  class Authentication extends React.Component {
    render() {
      return this.props.isAuthenticated ? <ComposedComponent /> : <Redirect to={login} push />;
    }
  }

  const mapStateToProps = state => state.user;

  return connect(mapStateToProps)(Authentication);
};
