import React from 'react';

export default class Header extends React.Component {
  renderHomeMenu = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Login</a>
        </li>
      </ul>
    );
  }

  renderCalendarMenu = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">Generate link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Access settings</a>
        </li>
        <li className="nav-item">
          <a href="#" onClick={this.handleLogOut}>Logout</a>
        </li>
      </ul>
    );
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <header id="header">
        <div className="menu-position bg-primary">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Calendula</a>
            <button type="button" className="search btn btn-primary" data-toggle="modal" data-target="#search" />
            <div className="modal fade" id="search" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <form className="form-inline my-2 my-lg-0">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {isAuthenticated ? this.renderCalendarMenu() : this.renderHomeMenu()}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
