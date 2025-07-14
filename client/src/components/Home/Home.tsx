import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getPokemonList, updateOffset } from "../../features/pokemon";
import type { PokemonListItem } from "../../types/pokemon";
import { Link } from "react-router-dom";
import Preloader from "../Preloader";

const Home = () => {
  const dispatch = useAppDispatch();

  const { offset, limit, pokemonList, loadingPokemonList, loadingMore, chunkSize } =
    useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemonList({ offset, limit }));
  }, [offset]);

  function handleOffsetClick() {
    dispatch(updateOffset(offset + limit));
  }

  const getChunkedItems = (items: PokemonListItem[], size: number) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };

  const chunkedItems = getChunkedItems(pokemonList, chunkSize);

  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12">
            <h2 className="center-align teal-text text-darken-2">
              <i className="material-icons left">catching_pokemon</i>
              Pokémon Collection
            </h2>
            <p className="center-align grey-text text-darken-1">
              Discover and explore the world of Pokémon
            </p>
          </div>
        </div>
      </div>

      {loadingPokemonList && pokemonList.length === 0 ? (
        <div className="section">
          <div className="row">
            <div className="col s12">
              <Preloader size="big" color="blue" />
              <p className="center-align grey-text">Loading Pokémon...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {chunkedItems.map((rowItems, rowIndex) => (
            <div className="row" key={rowIndex}>
              {rowItems.map((item: PokemonListItem, itemIndex: number) => (
                <div className="col s12 m6 l4" key={itemIndex}>
                  <div className="pokemon-card">
                    <div className="pokemon-image-container">
                      <img 
                        src={item.img_url} 
                        alt={item.name}
                        className="pokemon-image" 
                      />
                      <div className="pokemon-overlay">
                        <h3 className="pokemon-name">{item.name.toUpperCase()}</h3>
                      </div>
                    </div>
                    <div className="pokemon-card-content">
                      <Link 
                        to={`/pokemon/${item.id}`} 
                        className="btn-system btn-info"
                      >
                        <i className="material-icons">visibility</i>
                        <span>View More</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          {pokemonList.length > 0 && (
            <div className="section">
              <div className="row">
                <div className="col s12 center-align">
                  <button
                    onClick={handleOffsetClick}
                    className="btn-system btn-primary btn-large"
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <i className="material-icons">hourglass_empty</i>
                        <span>Loading More...</span>
                      </>
                    ) : (
                      <>
                        <i className="material-icons">expand_more</i>
                        <span>Load More Pokémon</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
