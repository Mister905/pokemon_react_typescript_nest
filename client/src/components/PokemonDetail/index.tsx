import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemon } from "../../actions/pokemon";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Preloader from "../Preloader";

const PokemonDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const loadingPokemon = useAppSelector(
    (state) => state.pokemon.loadingPokemon
  );
  const pokemon = useAppSelector((state) => state.pokemon.pokemon);

  useEffect(() => {
    if (id) dispatch(getPokemon(Number(id)));
  }, [id, dispatch]);

  if (loadingPokemon || !pokemon) {
    return (
      <div className="container">
        <div className="row">
          <div className="col m12">
            <Preloader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col m12">
          <div className="card">
            <div className="card-image">
              <img src={pokemon.img_url} alt={pokemon.name} />
              <span className="card-title">{pokemon.name.toUpperCase()}</span>
            </div>
            <div className="card-content">
              <p>Type: {pokemon.type}</p>
            </div>
            <div className="card-action">
              <Link to="/home">View More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
