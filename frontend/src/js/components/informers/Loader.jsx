import React from 'react';

export default (props) => {
  const stylesLayot = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 20000,
    backgroundColor: '#fff',
    opacity: 0.8,
  };

  const styleStatus = {
    paddingLeft: '10px',
    paddingTop: '15px',
  };
  const {
    requestStatus,
  } = props;

  const processNames = {
    pending: 'Ожидание',
    requested: 'Аутентификация',
    successed: null,
    failured: null,
  };
  const processName = processNames[requestStatus];
  return (
    <div>
      {processName && (
        <div style={stylesLayot}>
          <img alt="" src="/src/client/images/icons/preloader.gif" />
          <p style={styleStatus}>{processName}...</p>
        </div>
      )}
    </div>
  );
};
