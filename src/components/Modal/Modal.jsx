// Libs
import { Component } from 'react';
export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKeydown);
  }

  handleEscKeydown = e => {
    const KEY_CODE = 'Escape';

    if (e.key === KEY_CODE) {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
