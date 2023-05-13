// Libs
import { Component } from 'react';
import PropTypes from 'prop-types';
// React components
import { Modal } from '../Modal/Modal';
// Styled components
import { GalleryCard, GalleryImage } from './ImageGalleryItem.styled';

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
        <GalleryCard>
          <GalleryImage
            src={webformatURL}
            alt={tags}
            onClick={this.handleModalOpen}
          />
        </GalleryCard>

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
