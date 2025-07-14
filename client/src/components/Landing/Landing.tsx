import React from 'react';
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

interface LandingProps {
  className?: string;
}

const Landing: React.FC<LandingProps> = ({ className }) => {
  return (
    <div className={`container-fluid ${className || ''}`}>
      {/* Hero Section */}
      <div className="section center-align pikachu-landing-section"></div>

      {/* Section 1 */}
      <div className="section center-align venusaur-landing-section">
        <h1 className="white-text text-shadow h1-text-shadow">
          Welcome to PokéWorld
        </h1>
        <p className="white-text p-text-shadow">Your adventure begins here.</p>

        <Link
          to={"/register"}
          className="btn-system btn-warning btn-large"
        >
          Register
        </Link>
      </div>

      {/* Section 2 */}
      <div className="section center-align mewtwo-landing-section">
        <h2 className="blue-text text-darken-4">Catch Your Dream Team</h2>
        <p className="black-text">
          Discover and explore the world of Pokémon with our interactive web app.
          Browse through hundreds of Pokémon, save your favorites, and add personal
          notes to track your journey. Create your account to unlock personalized
          features and start building your ultimate Pokémon collection.
        </p>
      </div>
    </div>
  );
};

export default Landing;
