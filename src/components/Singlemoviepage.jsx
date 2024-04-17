import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../components/single.css'
const Api_key = "c45a857c193f6302f2b5061c3b85e743";
const pageSize = 10; // Number of items per page

const SingleMoviePage = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMovieDetails();
  }, [movie_id, currentPage]);

  const fetchMovieDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Movie details:', data);
        setMovie(data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      });

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie credits');
        }
        return response.json();
      })
      .then(data => {
        console.log('Movie credits:', data);
        // Pagination logic for cast data
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setCast(data.cast.slice(startIndex, endIndex));
      })
      .catch(error => {
        console.error('Error fetching movie credits:', error);
        setError(error.message);
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (error) {
    return (
      <div className="container">
        <p>Error: {error}</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/">Go Back</Link>
      {movie ? (
        <div className="movie-details0">
        
        <img className='dummyimage' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <h1>{movie.title}</h1>
      
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          
          <h2>Cast</h2>
          <ul className="cast-list">
            {cast.map(actor => (
              <li key={actor.cast_id} className="cast-item">
                <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
                <p>{actor.name}</p>
              </li>
            ))}
          </ul>
       
     
         
          <div className="pagination">
            <button onClick={handlePreviousPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleMoviePage;
