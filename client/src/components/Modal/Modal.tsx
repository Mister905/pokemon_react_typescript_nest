import React, { useEffect, useRef } from 'react';
import './Modal.styles.scss';

interface ModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  id, 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  className 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Initialize Materialize modal
      const modal = window.M?.Modal?.init(modalRef.current, {
        dismissible: true,
        onCloseEnd: onClose
      });
      modal?.open();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (modalRef.current) {
        const instance = window.M?.Modal?.getInstance(modalRef.current);
        instance?.destroy();
      }
    };
  }, []);

  return (
    <div
      id={id}
      ref={modalRef}
      className={`modal ${size} ${className || ''}`}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4>{title}</h4>
          <button
            type="button"
            className="modal-close btn-flat"
            onClick={onClose}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
