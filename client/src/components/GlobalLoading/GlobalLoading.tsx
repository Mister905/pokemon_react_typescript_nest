import React from 'react';
import { useAppSelector } from '../../hooks';
import Preloader from '../Preloader';

const GlobalLoading: React.FC = () => {
  const { isLoading, loadingMessage } = useAppSelector((state) => state.loading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="global-loading-overlay">
      <div className="global-loading-content">
        <Preloader size="medium" color="blue" />
        <p className="loading-message">{loadingMessage}</p>
      </div>
    </div>
  );
};

export default GlobalLoading;
