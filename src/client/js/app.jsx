import React from 'react';
import Header from './containers/common/Header';
import Main from './components/common/Main';
import routes from './routes';
import ModalConductor from './containers/common/ModalConductor';

const App = () => {
  return (
    <div id="wrapper">
      <Header />
      <Main>
        {routes}
      </Main>
      <ModalConductor />
    </div>
  );
};

export default App;
