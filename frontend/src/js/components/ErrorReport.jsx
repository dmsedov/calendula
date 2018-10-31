import React from 'react';
import Alert from 'react-s-alert';

export default class ErrorReport extends React.Component {
  componentDidUpdate() {
    const { error } = this.props;
    error && Alert.error(error);
  }

  handleOnClose = () => {
    const { resetErrorMsg } = this.props;
    resetErrorMsg();
  }

  render() {
    console.log('error report');
    return (
      <Alert
        onClose={this.handleOnClose}
        timeout={5000}
        position="bottom"
        effect="scale"
      />
    );
  }
}
