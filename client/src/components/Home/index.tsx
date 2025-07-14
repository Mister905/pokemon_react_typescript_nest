import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getPokemonList, updateOffset } from "../../actions/pokemon";
import type { PokemonListItem } from "../../reducers/pokemon_reducer";
import { Link } from "react-router-dom";
import Preloader from "../Preloader";

const Home = () => {
  const dispatch = useAppDispatch();

  const { offset, limit, pokemonList, loadingPokemonList, chunkSize } =
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
    <div className="container-fluid">
      {loadingPokemonList ? (
        <Preloader />
      ) : (
        <>
          {chunkedItems.map((rowItems, rowIndex) => (
            <div className="row" key={rowIndex}>
              {rowItems.map((item: PokemonListItem, itemIndex: number) => (
                <div className="col m4" key={itemIndex}>
                  <div className="card">
                    <div className="card-image">
                      <img src={item.img_url} className="custom-card-img" />
                      <span className="card-title">
                        {item.name.toUpperCase()}
                      </span>
                    </div>
                    <div className="card-action custom-card-action">
                      <Link to={`/pokemon/${item.id}`}>View More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="row">
            <div className="col m4 offset-m4">
              <button
                onClick={handleOffsetClick}
                className="btn yellow darker-1 blue-text text-darken-2 btn-more"
              >
                More
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
