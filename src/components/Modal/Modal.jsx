import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  handleOverlayClose = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleEscapeClose = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleEscapeClose);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleEscapeClose);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClose}>
        <div className={css.modal}>
          <img className={css.img} src={this.props.url} alt="" />
        </div>
      </div>
    );
  }
}
