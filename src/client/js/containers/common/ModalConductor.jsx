import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
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

    const modals = {
      Search,
      AccessForm,
    };
    const ModalContent = modals[modalName];

    return (
      <Modal isOpen={isModalShown} toggle={this.handleCloseModal}>
        {isModalShown ? <ModalContent toggle={this.handleCloseModal} /> : null}
      </Modal>
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
