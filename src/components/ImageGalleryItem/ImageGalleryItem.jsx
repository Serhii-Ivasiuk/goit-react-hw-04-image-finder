// Libs
import { Component } from 'react';
import PropTypes from 'prop-types';
// React components
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    imageData: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.imageData;
    const { isModalOpen } = this.state;

    return (
      <>
        <li className="ImageGalleryItem">
          <img
            src={webformatURL}
            alt={tags}
            className="ImageGalleryItem-image"
            onClick={this.handleModalOpen}
          />
        </li>

        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.handleModalClose}
          />
        )}
      </>
    );
  }
}
