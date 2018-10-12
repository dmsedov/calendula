import React from 'react';

export default class ErrorReport extends React.Component {
  render() {
    // the style contains only the margin given as offset
    // options contains all alert given options
    // message is the alert message...
    // close is a function that closes the alert
    // const { style, options, message, close } = this.props
    const { message } = this.props;
    const styles = {
      position: 'bottom center',
      timeout: 5000,
      offset: '30px',
      transition: 'scale',
    };

    return (
      <div style={styles}>
        {message}
        <button type="button" onClick={close}>X</button>
      </div>
    )
  }
}
