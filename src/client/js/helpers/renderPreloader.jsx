import React from 'react';

export default (processName) => {
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

  return (
    <div style={stylesLayot}>
      <img alt="" src="/src/client/images/icons/preloader.gif" />
      <p style={styleStatus}>{processName}...</p>
    </div>);
};
