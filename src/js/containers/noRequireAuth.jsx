import React from 'react';
import { connect } from 'react-redux';


export default (ComposedComponent) => {
  class NotAuthentication extends React.Component {
    componentWillMount() {
      const { isAuthenticated, history } = this.props;
      console.log('componentWillMount NOTauthentication', isAuthenticated);
      if (isAuthenticated) {
        history.replace('/calendar');
      }
    }

    componentWillUpdate(nextProps) {
      const { isAuthenticated } = nextProps;
      const { history } = this.props;
      console.log('componentWillUpdate NOTauthentication', isAuthenticated);
      if (isAuthenticated) {
        history.replace('/calendar');
      }
    }

    render() {
      return (
        <ComposedComponent />
      );
    }
  }

  const mapStateToProps = state => state.user;

  return connect(mapStateToProps)(NotAuthentication);
};
