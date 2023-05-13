// Libs
import { Component } from 'react';
import PropTypes from 'prop-types';
export class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

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
