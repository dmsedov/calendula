import React from 'react';
import Header from './containers/Header';
import Main from './components/Main';
import routes from './routes';


const App = () => {
  return (
    <div id="wrapper">
      <Header key="header" />
      <Main key="main">
        {routes}
      </Main>
    </div>
  );
};

export default App;
