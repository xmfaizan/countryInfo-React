import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BucketListPage from "./pages/BucketListPage";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (country) => {
    if (favorites.some((fav) => fav.cca3 === country.cca3)) {
      setFavorites(favorites.filter((fav) => fav.cca3 !== country.cca3));
    } else {
      setFavorites([...favorites, country]);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                countries={countries}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/bucket-list"
            element={
              <BucketListPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
