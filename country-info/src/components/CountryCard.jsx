import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract country information
  const name = country.name.common;
  const flag = country.flags.svg;
  const population = country.population.toLocaleString();
  const region = country.region;
  const capital = country.capital?.[0] || "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div
      className="country-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flag-container">
        <img src={flag} alt={`Flag of ${name}`} className="country-flag" />
        <button
          className={`favorite-button ${
            isHovered || isFavorite ? "visible" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(country);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className="heart-icon filled" />
          ) : (
            <FaRegHeart className="heart-icon" />
          )}
        </button>
      </div>

      <div className="country-info">
        <h3 className="country-name">{name}</h3>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <p className="languages">
          <strong>Languages:</strong> {languages}
        </p>
      </div>

      <style jsx>{`
        .country-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .country-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .flag-container {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .country-flag {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .country-card:hover .country-flag {
          transform: scale(1.05);
        }

        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .favorite-button.visible {
          opacity: 1;
          transform: scale(1);
        }

        .heart-icon {
          color: #bbb;
          font-size: 18px;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .heart-icon.filled {
          color: #e74c3c;
        }

        .favorite-button:hover .heart-icon {
          transform: scale(1.1);
        }

        .country-info {
          padding: 1.2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .country-name {
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1.2rem;
          color: #2c3e50;
        }

        .country-info p {
          margin: 0.4rem 0;
          font-size: 0.9rem;
          color: #555;
        }

        .country-info strong {
          font-weight: 600;
          color: #34495e;
        }

        .languages {
          margin-top: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default CountryCard;
