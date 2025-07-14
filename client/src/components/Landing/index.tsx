import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

const LandingPage = () => {
  return (
    <div className="container-fluid">
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
          className="btn btn-register yellow darken-1 blue-text text-darken-2"
        >
          Register
        </Link>
      </div>

      {/* Section 2 */}
      <div className="section center-align mewtwo-landing-section">
        <h2 className="blue-text text-darken-4">Catch Your Dream Team</h2>
        <p className="black-text">
          Use our full-stack web app to create, manage, and organize your own
          Pokémon team. Add, update, or delete entries and explore the full
          capabilities of a real-world CRUD interface.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
