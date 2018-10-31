import React from 'react';

class Home extends React.PureComponent {
  render() {
    const { children } = this.props;
    console.log('render home component');
    return (
      <div id="home-content">
        <h1>Приветствуем на Calendula!</h1>
        {children}
      </div>
    );
  }
}

export default Home;
