import React from 'react';
import Header from './containers/common/Header';
import Main from './components/common/Main';
import routes from './routes';


const App = () => {
  return (
    <div id="wrapper">
      <Header />
      <Main>
        {routes}
      </Main>
    </div>
  );
};

export default App;
