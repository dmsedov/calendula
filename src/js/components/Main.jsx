import React from 'react';

const Main = (props) => {
  const { children } = props;

  return (
    <main>
      <div className="content">
        {children}
      </div>
    </main>
  );
};

export default Main;
