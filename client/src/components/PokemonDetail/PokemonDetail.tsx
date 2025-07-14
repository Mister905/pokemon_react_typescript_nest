import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "../../features/pokemon";
import { addFavourite, fetchFavourites, selectIsPokemonFavourited, removeFavourite } from "../../features/favourites";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Preloader from "../Preloader";
import "./PokemonDetail.styles.scss";

interface PokemonDetailProps {
  className?: string;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ className }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [favouriteMessage, setFavouriteMessage] = useState<string | null>(null);

  const loadingPokemon = useAppSelector(
    (state) => state.pokemon.loadingPokemon
  );
  const pokemon = useAppSelector((state) => state.pokemon.pokemon);
  const favouritesLoading = useAppSelector((state) => state.favourites.loading);
  const isPokemonFavourited = useAppSelector((state) => 
    pokemon ? selectIsPokemonFavourited(state, pokemon.id) : false
  );
  const currentFavourite = useAppSelector((state) => 
    pokemon ? state.favourites.favourites.find(f => f.pokemonId === pokemon.id) : null
  );

  useEffect(() => {
    if (id) dispatch(getPokemon(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    // Fetch favourites when component loads to check if Pokemon is already favourited
    dispatch(fetchFavourites());
  }, [dispatch]);

  if (loadingPokemon || !pokemon) {
    return (
      <div className={`container ${className || ''}`}>
        <div className="row">
          <div className="col m12">
            <Preloader size="big" color="blue" />
            <p className="center-align grey-text">
              {loadingPokemon ? 'Loading Pokemon details...' : 'Pokemon not found'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${className || ''}`}>
      {/* Back Navigation */}
      <div className="row">
        <div className="col s12">
          <button
            onClick={() => navigate('/home')}
            className="btn waves-effect waves-light blue darken-2 back-button"
          >
            <i className="material-icons">arrow_back</i>
            <span>Back to Pokemon List</span>
          </button>
        </div>
      </div>

      {/* Success/Error Message */}
      {favouriteMessage && (
        <div className="row">
          <div className="col s12">
            <div className={`card-panel ${favouriteMessage.includes('Failed') ? 'red lighten-4 red-text text-darken-4' : 'green lighten-4 green-text text-darken-4'}`}>
              <i className="material-icons left">
                {favouriteMessage.includes('Failed') ? 'error' : 'check_circle'}
              </i>
              {favouriteMessage}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <div className="card pokemon-detail-card">
            <div className="card-image">
              <img 
                src={pokemon.img_url} 
                alt={pokemon.name} 
                className="pokemon-detail-image"
              />
              <span className="card-title pokemon-detail-title">
                {pokemon.name.toUpperCase()}
              </span>
            </div>
            <div className="card-content">
              <div className="pokemon-info">
                <p><strong>Type:</strong> {pokemon.type}</p>
                <p><strong>ID:</strong> #{pokemon.id}</p>
                {pokemon.stats && pokemon.stats.length > 0 && (
                  <div className="pokemon-stats">
                    <p><strong>Stats:</strong></p>
                    <ul>
                      {pokemon.stats.map((stat, index) => (
                        <li key={index}>
                          {stat.name}: {stat.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {pokemon.moves && pokemon.moves.length > 0 && (
                  <div className="pokemon-moves">
                    <p><strong>Moves:</strong></p>
                    <ul>
                      {pokemon.moves.slice(0, 5).map((move, index) => (
                        <li key={index}>{move}</li>
                      ))}
                      {pokemon.moves.length > 5 && (
                        <li>... and {pokemon.moves.length - 5} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="card-action pokemon-actions">
              {isPokemonFavourited ? (
                // Show un-favourite button when Pokemon is already favourited
                <button
                  onClick={async () => {
                    if (pokemon) {
                      try {
                        if (currentFavourite) {
                          await dispatch(removeFavourite(currentFavourite.id)).unwrap();
                          setFavouriteMessage(`${pokemon.name} removed from favourites!`);
                          setTimeout(() => setFavouriteMessage(null), 3000);
                        }
                      } catch (error) {
                        setFavouriteMessage(`Failed to remove from favourites: ${error}`);
                        setTimeout(() => setFavouriteMessage(null), 3000);
                      }
                    }
                  }}
                  className="btn-system btn-danger btn-large"
                  disabled={favouritesLoading}
                >
                  <i className="material-icons">
                    {favouritesLoading ? 'hourglass_empty' : 'favorite'}
                  </i>
                  <span>
                    {favouritesLoading ? 'Removing...' : 'Remove from Favourites'}
                  </span>
                </button>
              ) : (
                // Show add to favourites button when Pokemon is not favourited
                <button
                  onClick={async () => {
                    if (pokemon) {
                      try {
                        await dispatch(addFavourite({ 
                          pokemonId: pokemon.id, 
                          pokemonName: pokemon.name 
                        })).unwrap();
                        setFavouriteMessage(`${pokemon.name} added to favourites!`);
                        setTimeout(() => setFavouriteMessage(null), 3000);
                      } catch (error) {
                        setFavouriteMessage(`Failed to add to favourites: ${error}`);
                        setTimeout(() => setFavouriteMessage(null), 3000);
                      }
                    }
                  }}
                  className="btn-system btn-warning btn-large"
                  disabled={favouritesLoading}
                >
                  <i className="material-icons">
                    {favouritesLoading ? 'hourglass_empty' : 'favorite_border'}
                  </i>
                  <span>
                    {favouritesLoading ? 'Adding...' : 'Add to Favourites'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
