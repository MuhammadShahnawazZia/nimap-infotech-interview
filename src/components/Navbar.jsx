import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const apiKey = 'c45a857c193f6302f2b5061c3b85e743'; // Replace 'YOUR_API_KEY' with your actual API key from TMDb

  const handleSearch = () => {
    setIsSearching(true);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results);
        setIsSearching(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsSearching(false);
      });
  };

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/ee">Top Rated</Link>
        <Link to="/eee">Upcoming</Link>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" onClick={handleSearch}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map(movie => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
