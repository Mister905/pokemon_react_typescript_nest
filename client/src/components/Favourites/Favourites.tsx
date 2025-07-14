import React, { useEffect, useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchFavourites, removeFavourite } from '../../features/favourites';
import FavouriteCard from './FavouriteCard';
import Preloader from '../Preloader';
import './Favourites.styles.scss';

interface SearchFilters {
  searchTerm: string;
  selectedTypes: string[];
  sortBy: 'name' | 'dateAdded' | 'pokemonId';
  sortOrder: 'asc' | 'desc';
}

const Favourites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favourites, loading, error } = useAppSelector(state => state.favourites);
  
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedTypes: [],
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Helper functions for Pokemon metadata
  const getPokemonTypes = (pokemonId: number): string[] => {
    // Expanded type mapping for Gen 1 Pokemon
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

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  // Filter and sort favourites based on all criteria
  const filteredAndSortedFavourites = useMemo(() => {
    let filtered = favourites;

    // Text search filter
    if (filters.searchTerm.trim()) {
      filtered = filtered.filter(favourite =>
        favourite.pokemonName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.selectedTypes.length > 0) {
      filtered = filtered.filter(favourite => {
        // For now, we'll use a simple type mapping based on Pokemon ID ranges
        // In a real app, you'd fetch actual Pokemon types from the API
        const pokemonTypes = getPokemonTypes(favourite.pokemonId);
        return filters.selectedTypes.some(type => pokemonTypes.includes(type));
      });
    }



    // Sorting - create a copy to avoid mutating the original array
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.pokemonName.toLowerCase();
          bValue = b.pokemonName.toLowerCase();
          break;
        case 'dateAdded':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'pokemonId':
          aValue = a.pokemonId;
          bValue = b.pokemonId;
          break;
        default:
          aValue = a.pokemonName.toLowerCase();
          bValue = b.pokemonName.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return sorted;
  }, [favourites, filters]);

  const handleRemoveFavourite = (favouriteId: number) => {
    dispatch(removeFavourite(favouriteId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };



  const handleTypeFilter = (type: string) => {
    setFilters(prev => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type)
        ? prev.selectedTypes.filter(t => t !== type)
        : [...prev.selectedTypes, type]
    }));
  };



  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      selectedTypes: [],
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <Preloader size="big" color="blue" />
            <p className="grey-text">Loading your favourites...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <div className="card-panel red lighten-4 red-text text-darken-4">
              <i className="material-icons left">error</i>
              Error: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12">
            <h2 className="center-align teal-text text-darken-2">
              <i className="material-icons left">favorite</i>
              My Favourites
            </h2>
            <p className="center-align grey-text text-darken-1">
              Your personal Pokemon collection
            </p>
          </div>
        </div>
        
        {/* Advanced Search and Filters */}
        {favourites.length > 0 && (
          <div className="row">
            <div className="col s12">
              <div className="favourites-advanced-search">
                {/* Text Search */}
                <div className="search-section">
                  <div className="input-field">
                    <input
                      type="text"
                      id="search"
                      value={filters.searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search your favourite Pokemon..."
                      className="search-input"
                    />
                    <label htmlFor="search" className={filters.searchTerm ? 'active' : ''}>
                      <i className="material-icons">search</i>
                      Search Favourites
                    </label>
                  </div>
                </div>

                {/* Type Filters */}
                <div className="filter-section">
                  <h6>Filter by Type:</h6>
                  <div className="type-filters">
                    {['fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeFilter(type)}
                        className={`btn-system btn-small type-filter ${filters.selectedTypes.includes(type) ? 'active' : ''}`}
                      >
                        <span className={`type-badge type-${type}`}>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>



                {/* Sorting Options */}
                <div className="filter-section">
                  <h6>Sort by:</h6>
                  <div className="sort-options">
                    {[
                      { key: 'name', label: 'Name' },
                      { key: 'dateAdded', label: 'Date Added' },
                      { key: 'pokemonId', label: 'Pokemon ID' }
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSortChange(key as SearchFilters['sortBy'])}
                        className={`btn-system btn-small sort-option ${filters.sortBy === key ? 'active' : ''}`}
                      >
                        {label}
                        {filters.sortBy === key && (
                          <i className="material-icons">
                            {filters.sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                          </i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Summary and Clear */}
                <div className="filter-summary">
                  <div className="results-info">
                    <span className="grey-text">
                      {filteredAndSortedFavourites.length} of {favourites.length} favourites
                      {filters.searchTerm && ` match "${filters.searchTerm}"`}
                      {filters.selectedTypes.length > 0 && ` (${filters.selectedTypes.length} type filters)`}
                    </span>
                  </div>
                  {(filters.searchTerm || filters.selectedTypes.length > 0) && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="btn-system btn-warning btn-small"
                    >
                      <i className="material-icons">clear_all</i>
                      <span>Clear All Filters</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="section">
          <div className="row">
            <div className="col s12 center-align">
              <div className="card-panel blue lighten-4 blue-text text-darken-4">
                <i className="material-icons large">favorite_border</i>
                <h5>No Favourites Yet</h5>
                <p>Start building your collection by adding Pokemon to your favourites!</p>
                <a href="/home" className="btn-system btn-primary">
                  <i className="material-icons">search</i>
                  <span>Browse Pokemon</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : filteredAndSortedFavourites.length === 0 ? (
        <div className="section">
          <div className="row">
            <div className="col s12 center-align">
              <div className="card-panel orange lighten-4 orange-text text-darken-4">
                <i className="material-icons large">search_off</i>
                <h5>No Results Found</h5>
                <p>No favourites match your current filters. Try adjusting your search criteria.</p>
                <button onClick={clearAllFilters} className="btn-system btn-warning">
                  <i className="material-icons">clear_all</i>
                  <span>Clear All Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="section">
          <div className="row">
            {filteredAndSortedFavourites.map((favourite) => (
              <div key={favourite.id} className="col s12 m6 l4">
                <FavouriteCard
                  favourite={favourite}
                  onRemove={handleRemoveFavourite}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
