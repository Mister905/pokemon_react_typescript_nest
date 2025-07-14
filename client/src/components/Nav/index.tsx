import { Link } from "react-router-dom";
import Logo from "../../assets/images/International_Pokémon_logo.svg";

const Nav = () => {
  return (
    <nav style={{ backgroundColor: "#ffea00" }}>
      <div className="nav-wrapper">
        <Link to={"/"} className="brand-logo">
          <img src={Logo} alt="Pokémon Logo" className="logo-img" />
        </Link>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={"/login"} className="btn-login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
