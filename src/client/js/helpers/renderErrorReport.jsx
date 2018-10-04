import React from 'react';

export default (msg) => {
  const stylesDescr = {
    fontSize: '19px',
  };

  return msg ? <p style={stylesDescr}>{msg}</p> : null;
};
