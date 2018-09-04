import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ComposedComponent) => {
  class NotAuthentication extends React.Component {
    render() {
      return this.props.isAuthenticated ? <Redirect to="/calendar" push /> : <ComposedComponent />;
    }
  }

  const mapStateToProps = state => state.user;

  return connect(mapStateToProps)(NotAuthentication);
};
