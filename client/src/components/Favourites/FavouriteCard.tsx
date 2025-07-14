import React from 'react';
import { Link } from 'react-router-dom';
import type { Favourite } from '../../features/favourites';

interface FavouriteCardProps {
  favourite: Favourite;
  onRemove: (favouriteId: number) => void;
}

const FavouriteCard: React.FC<FavouriteCardProps> = ({ favourite, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`Remove ${favourite.pokemonName} from favourites?`)) {
      onRemove(favourite.id);
    }
  };

  // Helper function to get Pokemon types (expanded mapping)
  const getPokemonTypes = (pokemonId: number): string[] => {
    const typeMap: Record<number, string[]> = {
      // Gen 1 Starters
      1: ['grass', 'poison'],    // Bulbasaur
      2: ['grass', 'poison'],    // Ivysaur
      3: ['grass', 'poison'],    // Venusaur
      4: ['fire'],               // Charmander
      5: ['fire'],               // Charmeleon
      6: ['fire', 'flying'],     // Charizard
      7: ['water'],              // Squirtle
      8: ['water'],              // Wartortle
      9: ['water'],              // Blastoise
      
      // Popular Electric
      25: ['electric'],          // Pikachu
      26: ['electric'],          // Raichu
      
      // Popular Psychic
      63: ['psychic'],           // Abra
      64: ['psychic'],           // Kadabra
      65: ['psychic'],           // Alakazam
      150: ['psychic'],          // Mewtwo
      151: ['psychic'],          // Mew
      
      // Dragons
      147: ['dragon'],           // Dratini
      148: ['dragon'],           // Dragonair
      149: ['dragon', 'flying'], // Dragonite
      
      // Fighting types
      56: ['fighting'],          // Mankey
      57: ['fighting'],          // Primeape
      66: ['fighting'],          // Machop
      67: ['fighting'],          // Machoke
      68: ['fighting'],          // Machamp
      
      // Ghost types
      92: ['ghost', 'poison'],   // Gastly
      93: ['ghost', 'poison'],   // Haunter
      94: ['ghost', 'poison'],   // Gengar
      
      // Flying types
      16: ['normal', 'flying'],  // Pidgey
      17: ['normal', 'flying'],  // Pidgeotto
      18: ['normal', 'flying'],  // Pidgeot
      
      // Ground types
      27: ['ground'],            // Sandshrew
      28: ['ground'],            // Sandslash
      31: ['poison', 'ground'],  // Nidoqueen
      34: ['poison', 'ground'],  // Nidoking
      
      // Ice types
      87: ['water', 'ice'],      // Dewgong
      91: ['water', 'ice'],      // Cloyster
      124: ['ice', 'psychic'],   // Jynx
      131: ['water', 'ice'],     // Lapras
      144: ['ice', 'flying'],    // Articuno
      
      // Rock types
      74: ['rock', 'ground'],    // Geodude
      75: ['rock', 'ground'],    // Graveler
      76: ['rock', 'ground'],    // Golem
      95: ['rock', 'ground'],    // Onix
      142: ['rock', 'flying'],   // Aerodactyl
      
      // Steel types (none in Gen 1, but adding for completeness)
      81: ['electric', 'steel'],  // Magnemite (retconned to Steel)
      82: ['electric', 'steel'],  // Magneton (retconned to Steel)
    };
    return typeMap[pokemonId] || ['normal'];
  };

  const pokemonTypes = getPokemonTypes(favourite.pokemonId);

  return (
    <div className="favourite-card">
      <div className="card">
        <div className="card-image">
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${favourite.pokemonId}.png`}
            alt={favourite.pokemonName}
            className="pokemon-sprite"
          />
          <span className="card-title favourite-title">
            {favourite.pokemonName.toUpperCase()}
          </span>
        </div>
        <div className="card-content">
          <p><strong>Pokemon ID:</strong> #{favourite.pokemonId}</p>
          <div className="pokemon-types">
            <strong>Type(s):</strong>
            <div className="type-badges">
              {pokemonTypes.map((type, index) => (
                <span key={index} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
          <p><strong>Added:</strong> {new Date(favourite.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="card-action">
                           <Link
                   to={`/favourites/${favourite.id}`}
                   className="btn-system btn-info"
                 >
                   <i className="material-icons">visibility</i>
                   <span>View Details</span>
                 </Link>
                 <button
                   onClick={handleRemove}
                   className="btn-system btn-danger"
                 >
                   <i className="material-icons">delete</i>
                   <span>Remove</span>
                 </button>
        </div>
      </div>
      
    </div>
  );
};

export default FavouriteCard;
