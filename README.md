first react project

data is fetched directly from https://restcountries.com/v3.1/all

## 📂 Project Structure

country-info/
├── src/
│ ├── App.jsx # Main application component with routing and state management
│ ├── components/
│ │ ├── Navbar.jsx # Navigation bar component with home and bucket list links
│ │ └── CountryCard.jsx # Card component to display country information
│ ├── pages/
│ │ ├── HomePage.jsx # Home page with search and country grid
│ │ └── BucketListPage.jsx # Page to display favorited countries
│ └── main.jsx # Entry point for React application
├── public/
│ └── index.html # HTML template
└── package.json # Project dependencies and scripts
