import React from 'react';
import Header from './containers/common/Header';
import Main from './components/common/Main';
import routes from './routes';
import ModalConductor from './containers/common/ModalConductor';
import ErrorReport from './containers/ErrorReport';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Main>
        {routes}
      </Main>
      <ModalConductor />
      <ErrorReport />
    </div>
  );
};

export default App;
