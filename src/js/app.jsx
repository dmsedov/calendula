import React from 'react';
import Header from './containers/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import routes from './routes';


const App = () => {
  return (
    <div>
      <Header />
      <Main>
        {routes}
      </Main>
      <Footer />
    </div>
  );
};

export default App;
