import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';

import ShoppiesPopcorn from '../assets/images/shoppies-popcorn.svg';

const MODAL_STYLE = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 998,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'visible auto',
    outline: 'none',
  }
};

const SuccessConfirmModal = ({ isVisible, onClose }) => (
  <Modal
    isOpen={isVisible}
    onRequestClose={onClose}
    className="modal-container"
    style={MODAL_STYLE}
  >
    <div className="inner-modal-container">
      <div className="modal-title">Thank you!</div>
      <img className="modal-image" src={ShoppiesPopcorn} alt="Popcorn"/>
      <div className="modal-subtitle">Your nominations have been successfully submited.</div>
      <div className="modal-description">
        Our nomination period will end on April 30th, 2021. And, the voting period will begin May 15th, 2021 so be ready to cast your votes!
      </div>
      <button className="modal-button" onClick={onClose}> 
        Close
      </button>
    </div>
  </Modal>
);

SuccessConfirmModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SuccessConfirmModal;
