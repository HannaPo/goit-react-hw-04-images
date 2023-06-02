import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './../Modal/Modal';
import { ImageItem, Img } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false, 
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, 
    }));
  };

  render() {
    const { showModal } = this.state; 
    const { image } = this.props; 

    return (
      <>
        <ImageItem>
          <Img
            src={image.webformatURL} 
            alt={image.tags} 
            onClick={this.toggleModal} 
          />
          {showModal && ( 
            <Modal
              largeImageURL={image.largeImageURL} 
              tags={image.tags} 
              onClose={this.toggleModal} 
            />
          )}
        </ImageItem>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;