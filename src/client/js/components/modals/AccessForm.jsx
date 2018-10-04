import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

export default class AccessForm extends React.Component {
  render() {
    const { toggle } = this.props;

    return (
      <div id="access-control">
        <ModalHeader toggle={this.toggle}>Управление доступом</ModalHeader>
        <ModalBody>
          <form className="access-form d-flex flex-column" id="access-user-form">
            <div className="user-rights-fields d-flex justify-content-around align-items-center">
              <div className="user-name"><span>Логин</span></div>
              <div className="user-rights">Чтение</div>
              <div className="user-rights">Чтение и запись</div>
              <div className="act-delete-user">Удалить</div>
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
                <input type="radio" name="Женя" value="rw" readOnly />
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
                <input type="radio" name="Женя" value="rw" readOnly />
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
                <input type="radio" name="Женя" value="rw" readOnly />
              </div>
            </div>
            <div className="form-controls">
              <button type="submit" className="btn btn-primary btn-sm">Сохранить</button>
              <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={toggle}>Закрыть</button>
            </div>
          </form>
        </ModalBody>
      </div>
    );
  }
}
