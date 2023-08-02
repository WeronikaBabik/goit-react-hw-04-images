import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = { isModal: false };
  openModal = () => {
    this.setState(({ isModal }) => ({ isModal: !isModal }));
  };

  render() {
    const { src, alt, largeImage } = this.props;
    return (
      <li className={css.ImageGalleryItem} onClick={this.openModal}>
        <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
        {this.state.isModal && (
          <Modal
            largeImageURL={largeImage}
            tags={alt}
            closeModal={this.openModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
};
