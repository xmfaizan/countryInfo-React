import { useState, useEffect, useRef } from "react";
import CountryCard from "../components/CountryCard";
import { FaSearch } from "react-icons/fa";

const HomePage = ({ countries, favorites, toggleFavorite, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const suggestionsRef = useRef(null);

  // Filter countries based on search term
  useEffect(() => {
    if (countries.length > 0) {
      const filtered =
        searchTerm.trim() !== ""
          ? countries.filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : countries;

      setFilteredCountries(filtered);

      const newSuggestions =
        searchTerm.trim() !== ""
          ? countries
              .filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map((country) => country.name.common)
          : [];

      setSuggestions(newSuggestions);
    }
  }, [searchTerm, countries]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading countries...</p>

        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 60vh;
          }

          .loading-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #3498db;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>

        <style jsx>{`
          .error-container {
            text-align: center;
            padding: 2rem;
            color: #e74c3c;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Explore Which Country Next?</h1>
        <div className="search-container" ref={suggestionsRef}>
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              className="search-input"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="countries-grid">
        {filteredCountries.map((country) => (
          <div className="country-card-container" key={country.cca3}>
            <CountryCard
              country={country}
              isFavorite={favorites.some((fav) => fav.cca3 === country.cca3)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .home-page {
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        h1 {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .search-container {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: #7f8c8d;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 2px 15px rgba(52, 152, 219, 0.15);
        }

        .suggestions-list {
          position: absolute;
          width: 100%;
          background-color: white;
          border-radius: 0 0 8px 8px;
          border: 1px solid #ddd;
          border-top: none;
          list-style-type: none;
          margin: 0;
          padding: 0;
          max-height: 300px;
          overflow-y: auto;
          z-index: 10;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .suggestion-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .suggestion-item:hover {
          background-color: #f5f7fa;
        }

        .countries-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }

        @media (min-width: 576px) {
          .countries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .countries-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 992px) {
          .countries-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .country-card-container {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
