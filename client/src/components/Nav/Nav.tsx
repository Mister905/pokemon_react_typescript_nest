import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import Logo from "../../assets/images/International_Pokémon_logo.svg";

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`nav-container ${className || ''}`}>
      <div className="nav-wrapper">
        <Link to={isAuthenticated ? "/home" : "/"} className="brand-logo">
          <img src={Logo} alt="Pokémon Logo" className="logo-img" />
        </Link>

        <a 
          href="#" 
          data-target="mobile-nav" 
          className="sidenav-trigger right"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <i className="material-icons">menu</i>
        </a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/favourites" className="btn-system btn-danger btn-nav">
                  <i className="material-icons">favorite</i>
                  <span>Favourites</span>
                </Link>
              </li>
              <li>
                <span className="user-greeting">
                  Welcome, {user?.name || user?.username}!
                </span>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="btn-system btn-danger btn-nav"
                >
                  <i className="material-icons">exit_to_app</i>
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn-system btn-primary btn-nav">
                  <i className="material-icons">input</i>
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-system btn-info btn-nav">
                  <i className="material-icons">person_add</i>
                  <span>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Navigation */}
        <ul className={`sidenav ${isMobileMenuOpen ? 'sidenav-open' : ''}`} id="mobile-nav">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/favourites" className="btn-system btn-danger btn-nav">
                  <i className="material-icons">favorite</i>
                  <span>Favourites</span>
                </Link>
              </li>
              <li>
                <span className="user-greeting">
                  Welcome, {user?.name || user?.username}!
                </span>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="btn-system btn-danger btn-nav"
                >
                  <i className="material-icons">exit_to_app</i>
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn-system btn-primary btn-nav">
                  <i className="material-icons">input</i>
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-system btn-info btn-nav">
                  <i className="material-icons">person_add</i>
                  <span>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
