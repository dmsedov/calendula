import React from 'react';

export default class AccessForm extends React.Component {
  render() {
    return (
      <div id="access-control">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="users-control">Control of user access</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <form className="access-form d-flex flex-column" id="access-user-form">
                <div className="user-rights-fields d-flex justify-content-around align-items-center">
                  <div className="user-name"><span>Nickname</span></div>
                  <div className="user-rights">Read</div>
                  <div className="user-rights">Write and Read</div>
                  <div className="act-delete-user">Delete user</div>
                </div>
                <div className="form-check form-check-inline user-rights-fields d-flex">
                  <div className="user-name">
                    <label>Петя</label>
                  </div>
                  <div className="user-rights">
                    <label htmlFor="1-r">
                      <span className="checked" />
                    </label>
                    <input id="1-r" type="radio" name="Петя" value="r" checked readOnly />
                  </div>
                  <div className="user-rights">
                    <label htmlFor="1-rw">
                      <span />
                    </label>
                    <input id="1-rw" type="radio" name="Петя" value="rw" readOnly />
                  </div>
                  <div className="act-delete-user">
                    <button type="button" className="btn btn-primary btn-sm">Delete</button>
                  </div>
                </div>
                <div className="form-check form-check-inline user-rights-fields d-flex">
                  <div className="user-name">
                    <label>Женя</label>
                  </div>
                  <div className="user-rights">
                    <input type="radio" name="Женя" value="r" checked readOnly />
                  </div>
                  <div className="user-rights">
                    <input type="radio" name="Женя" value="rw" readOnly />
                  </div>
                  <div className="act-delete-user">
                    <button type="button" className="btn btn-primary btn-sm">Delete</button>
                  </div>
                </div>
                <div className="form-check form-check-inline user-rights-fields d-flex">
                  <div className="user-name">
                    <label>Дима</label>
                  </div>
                  <div className="user-rights">
                    <input type="radio" name="Дима" value="r" checked readOnly />
                  </div>
                  <div className="user-rights">
                    <input type="radio" name="Дима" value="rw" readOnly />
                  </div>
                  <div className="act-delete-user">
                    <button type="button" className="btn btn-primary btn-sm">Delete</button>
                  </div>
                </div>
                <div className="form-controls">
                  <button type="submit" className="btn btn-primary btn-sm">Save</button>
                  <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={this.handleCloseModal}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
