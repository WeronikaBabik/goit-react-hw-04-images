import css from './Modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ tags, largeImageURL, modal }) => {
  useEffect(() => {
    const handleKeyUp = e => {
      if (e.code === 'Escape') {
        modal();
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
