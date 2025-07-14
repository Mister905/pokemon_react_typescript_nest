import React from 'react';

interface PreloaderProps {
  size?: 'small' | 'medium' | 'big';
  color?: 'blue' | 'red' | 'green' | 'yellow';
}

const Preloader: React.FC<PreloaderProps> = ({ 
  size = 'big', 
  color = 'blue' 
}) => {
  return (
    <div className="col m12 center-align">
      <div className={`preloader-wrapper ${size} active`}>
        <div className={`spinner-layer spinner-${color}-only`}>
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
