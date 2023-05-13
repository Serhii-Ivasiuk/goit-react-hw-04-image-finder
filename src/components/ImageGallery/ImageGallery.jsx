// Libs
import PropTypes from 'prop-types';
// React components
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  return (
    <ul className="ImageGallery">
      {data.map(item => (
        <ImageGalleryItem key={item.id} imageData={item} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired }))
    .isRequired,
};
