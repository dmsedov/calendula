import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import AccessForm from '../modals/AccessForm';
import Search from '../modals/Search';
import * as uiActions from '../../actions/uiPopup';

class ModalConductor extends React.Component {
  handleCloseModal = () => {
    const { closeModal } = this.props;

    closeModal();
  }

  render() {
    const { isModalShown, modalName } = this.props;

    const styles = {
      display: isModalShown ? 'block' : 'none',
    };

    const modalClasses = cn({
      modal: true,
      fade: true,
      show: isModalShown ? true : false,
    });

    // const layoutClasses = cn({
    //   'modal-backdrop': true,
    //   fade: true,
    //   show: true,
    // });

    const modals = {
      Search,
      AccessForm,
    };
    const Modal = modals[modalName];

    return (
      <div className={modalClasses} tabIndex="-1" style={styles} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {isModalShown ? [
          <Modal />,
          <div className="modal-backdrop fade show" onClick={this.handleCloseModal} />,
        ] : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isModalShown, modalName } = state.uiPopup;
  return {
    isModalShown,
    modalName,
  };
};

export default connect(mapStateToProps, uiActions)(ModalConductor);
