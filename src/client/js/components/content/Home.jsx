import React from 'react';

const Main = (props) => {
  const { children } = props;

  return (
    <div id="home-content">
      <h1>Приветствуем на Calendula!</h1>
      {children}
    </div>
  );
};

export default Main;
