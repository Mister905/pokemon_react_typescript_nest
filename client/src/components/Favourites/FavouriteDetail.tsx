import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchFavourites, removeFavourite } from '../../features/favourites';
import { fetchNotes } from '../../features/notes';
import Notes from '../Notes';
import './FavouriteDetail.styles.scss';

const FavouriteDetail: React.FC = () => {
  const { favouriteId } = useParams<{ favouriteId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { favourites, loading, error } = useAppSelector(state => state.favourites);
  
  // Find the current favourite
  const currentFavourite = favourites.find(f => f.id === Number(favouriteId));
  
  useEffect(() => {
    if (favouriteId) {
      // Fetch favourites if not already loaded
      if (favourites.length === 0) {
        dispatch(fetchFavourites());
      }
      // Fetch notes for this favourite
      dispatch(fetchNotes(Number(favouriteId)));
    }
  }, [favouriteId, favourites.length, dispatch]);

  const handleRemoveFavourite = () => {
    if (currentFavourite && window.confirm(`Remove ${currentFavourite.pokemonName} from favourites?`)) {
      dispatch(removeFavourite(currentFavourite.id));
      navigate('/favourites');
    }
  };

  const handleBackToFavourites = () => {
    navigate('/favourites');
  };

  if (loading) {
    return (
      <div className="favourite-detail-loading">
        <i className="material-icons rotating">refresh</i>
        <span>Loading favourite details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favourite-detail-error">
        <i className="material-icons">error</i>
        <span>Error: {error}</span>
        <button onClick={handleBackToFavourites} className="btn-system btn-primary">
          <i className="material-icons">arrow_back</i>
          <span>Back to Favourites</span>
        </button>
      </div>
    );
  }

  if (!currentFavourite) {
    return (
      <div className="favourite-detail-not-found">
        <i className="material-icons">search_off</i>
        <h3>Favourite Not Found</h3>
        <p>The favourite you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBackToFavourites} className="btn-system btn-primary">
          <i className="material-icons">arrow_back</i>
          <span>Back to Favourites</span>
        </button>
      </div>
    );
  }

  return (
    <div className="favourite-detail">
      {/* Header with back button */}
      <div className="favourite-detail-header">
        <button onClick={handleBackToFavourites} className="btn-system btn-secondary btn-small">
          <i className="material-icons">arrow_back</i>
          <span>Back to Favourites</span>
        </button>
        <h1 className="favourite-detail-title">
          <i className="material-icons">favorite</i>
          {currentFavourite.pokemonName}
        </h1>
        <button onClick={handleRemoveFavourite} className="btn-system btn-danger btn-small">
          <i className="material-icons">delete</i>
          <span>Remove from Favourites</span>
        </button>
      </div>

      {/* Pokemon Information */}
      <div className="favourite-pokemon-info">
        <div className="pokemon-image">
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentFavourite.pokemonId}.png`}
            alt={currentFavourite.pokemonName}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/src/assets/images/poke_ball.png'; // Fallback image
            }}
          />
        </div>
        
        <div className="pokemon-details">
          <h2>{currentFavourite.pokemonName}</h2>
          <p className="pokemon-id">Pokemon ID: #{currentFavourite.pokemonId}</p>
          <p className="pokemon-description">
                            Added to favourites on {new Date(currentFavourite.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Notes Section */}
      <div className="favourite-notes-section">
        <Notes 
          favouriteId={currentFavourite.id} 
          pokemonName={currentFavourite.pokemonName}
          className="favourite-detail-notes"
        />
      </div>
    </div>
  );
};

export default FavouriteDetail;
