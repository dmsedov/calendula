import React from 'react';
import Alert from 'react-s-alert';
import errorReport from '../errors';

export default class ErrorReport extends React.Component {
  componentDidUpdate() {
    const { error } = this.props;
    const msg = errorReport(error);
    msg && Alert.error(msg);
  }

  handleOnClose = () => {
    const { resetErrorMsg } = this.props;
    resetErrorMsg();
  }

  render() {
    return (
      <Alert
        onClose={this.handleOnClose}
        timeout={5000}
        position="bottom"
        offset={100}
        effect="scale"
      />
    );
  }
}
