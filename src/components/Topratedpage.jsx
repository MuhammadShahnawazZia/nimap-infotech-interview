import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../components/PopularMoviesPage.css'; // Import CSS file

const Api_key = "c45a857c193f6302f2b5061c3b85e743";
const PAGE_SIZE = 20; // Number of movies per page

const Topratedpage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]); // Fetch movies whenever currentPage changes

  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(error => console.error('Error fetching popular movies:', error));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <h1>Topratedpage</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <div className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default Topratedpage;
