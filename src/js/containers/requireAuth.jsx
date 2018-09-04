import React from 'react';
import { connect } from 'react-redux';


export default (ComposedComponent) => {
  class Authentication extends React.Component {
    componentWillMount() {
      const { isAuthenticated } = this.props;
      console.log('componentWillMount authentication', isAuthenticated);
      if (!isAuthenticated) {
        this.props.history.replace('/login');
      }
    }

    componentWillUpdate(nextProps) {
      const { isAuthenticated } = nextProps;
      console.log('componentWillUpdate authentication', isAuthenticated);
      if (!isAuthenticated) {
        this.props.history.replace('/login');
      }
    }

    render() {
      return (
        <ComposedComponent />
      );
    }
  }

  const mapStateToProps = state => state.user;

  return connect(mapStateToProps)(Authentication);
};
