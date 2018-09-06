import React from 'react';
import Header from './containers/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import routes from './routes';


const App = () => {
  return (
    <div id="wrapper">
      <Header key="header" />
      <Main key="main">
        {routes}
      </Main>
      <Footer key="footer" />
    </div>
  );
};

export default App;
