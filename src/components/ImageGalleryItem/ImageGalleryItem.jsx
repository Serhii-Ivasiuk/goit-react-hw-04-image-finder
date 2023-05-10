export const ImageGalleryItem = ({ imageData }) => {
  const { webformatURL, tags } = imageData;

  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};
