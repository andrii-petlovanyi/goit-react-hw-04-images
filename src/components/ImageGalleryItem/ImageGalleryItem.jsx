import { GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL = '',
  largeImageURL = '',
  tags = '',
  onClick = () => {},
}) => {
  return (
    <>
      <GalleryItem>
        <img
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      </GalleryItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
