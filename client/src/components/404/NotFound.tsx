import React from 'react';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  className?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ className }) => {
  return (
    <div className={`container ${className || ''}`}>
      <div className="row">
        <div className="col m12 center-align">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
