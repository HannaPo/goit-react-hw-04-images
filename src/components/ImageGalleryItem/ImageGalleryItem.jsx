import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal/Modal';
import { ImageItem, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

      return (
      <>
        <ImageItem>
          <Img
            src={image.webformatURL} 
            alt={image.tags} 
            onClick={toggleModal} 
          />
          {showModal && ( 
            <Modal
              largeImageURL={image.largeImageURL} 
              tags={image.tags} 
              onClose={toggleModal} 
            />
          )}
        </ImageItem>
      </>
    );
  }


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;