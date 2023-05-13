// Libs
import PropTypes from 'prop-types';
// React components
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
// Styled components
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ data }) => {
  return (
    <Gallery className="ImageGallery">
      {data.map(item => (
        <ImageGalleryItem key={item.id} imageData={item} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired }))
    .isRequired,
};
