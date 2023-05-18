// Libs
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
// Styled components
import { Overlay, ModalWindow } from './Modal.styled';

import React from 'react';

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleEscKeydown = evt => {
      const KEY_CODE = 'Escape';

      if (evt.key === KEY_CODE) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKeydown);
    document.documentElement.style.overflowY = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
      document.documentElement.style.overflowY = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const backdropRootPortal = document.querySelector('#backdrop-root');

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    backdropRootPortal
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
