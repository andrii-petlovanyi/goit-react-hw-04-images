import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return createPortal(
      <Backdrop onClick={this.onBackdropClick}>
        <ModalWrapper>
          <img src={this.props.url} alt="" />
        </ModalWrapper>
      </Backdrop>,
      modalRoot
    );
  }
}
