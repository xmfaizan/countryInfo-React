import CountryCard from "../components/CountryCard";
import { FaSuitcaseRolling } from "react-icons/fa";

const BucketListPage = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="empty-bucket-list">
        <FaSuitcaseRolling className="empty-icon" />
        <h2>Your bucket list is empty</h2>
        <p>
          Start adding countries from the home page to build your travel bucket
          list!
        </p>

        <style jsx>{`
          .empty-bucket-list {
            text-align: center;
            padding: 4rem 1rem;
            max-width: 600px;
            margin: 0 auto;
          }

          .empty-icon {
            font-size: 4rem;
            color: #bdc3c7;
            margin-bottom: 1rem;
          }

          h2 {
            color: #2c3e50;
            margin-bottom: 1rem;
          }

          p {
            color: #7f8c8d;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bucket-list-page">
      <div className="header">
        <h1>Your Travel Bucket List</h1>
        <p>Keep track of countries you want to visit</p>
      </div>

      <div className="countries-grid">
        {favorites.map((country) => (
          <div className="country-card-container" key={country.cca3}>
            <CountryCard
              country={country}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .bucket-list-page {
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        h1 {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .header p {
          color: #7f8c8d;
          font-size: 1.2rem;
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

export default BucketListPage;
