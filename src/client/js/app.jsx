import React from 'react';
// import Alert from 'react-s-alert';
import Header from './containers/common/Header';
import Main from './components/common/Main';
import routes from './routes';
import ModalConductor from './containers/common/ModalConductor';
import ErrorReport from './containers/ErrorReport';
// import ErrorContent from './js/components/alerts/ErrorContent';

const App = () => {
  return [
    <div id="header-back" className="bg-primary" />,
    <div id="wrapper">
      <Header />
      <Main>
        {routes}
      </Main>
      <ModalConductor />
      <ErrorReport />
    </div>
  ];
};

export default App;
