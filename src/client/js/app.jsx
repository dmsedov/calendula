import React from 'react';
import Alert from 'react-s-alert';
import Header from './containers/common/Header';
import Main from './components/common/Main';
import routes from './routes';
import ModalConductor from './containers/common/ModalConductor';
// import ErrorContent from './js/components/alerts/ErrorContent';

const App = () => {
  return (
    <div id="wrapper">
      <Header />
      <Main>
        {routes}
      </Main>
      <ModalConductor />
      <Alert
        timeout={5000}
        position="bottom"
        offset={100}
        effect="scale"
      />
    </div>
  );
};

export default App;
