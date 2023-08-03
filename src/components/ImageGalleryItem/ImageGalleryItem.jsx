import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImage }) => {
  const [isModal, setIsModal] = useState(false);
  const openModal = () => setIsModal(!isModal);

  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
      {isModal && (
        <Modal largeImageURL={largeImage} tags={alt} modal={openModal} />
      )}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
};
