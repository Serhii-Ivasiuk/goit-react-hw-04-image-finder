// Libs
import { useState } from 'react';
import PropTypes from 'prop-types';
// React components
import { Modal } from '../Modal/Modal';
// Styled components
import { GalleryCard, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  imageData: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GalleryCard>
        <GalleryImage src={webformatURL} alt={tags} onClick={handleModalOpen} />
      </GalleryCard>

      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
