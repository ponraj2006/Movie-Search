const API_KEY = 'f5c9727e'; // OMDB API key

async function searchMovies() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();

    const moviesDiv = document.getElementById('movies');
    moviesDiv.innerHTML = '';

    if (data.Response === 'True') {
        data.Search.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie';

            const movieImg = document.createElement('img');
            movieImg.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150';
            movieDiv.appendChild(movieImg);

            const movieInfo = document.createElement('div');
            movieInfo.className = 'movie-info';

            const movieTitle = document.createElement('h2');
            movieTitle.className = 'movie-title';
            movieTitle.textContent = movie.Title;
            movieInfo.appendChild(movieTitle);

            const movieYear = document.createElement('p');
            movieYear.className = 'movie-year';
            movieYear.textContent = `Year: ${movie.Year}`;
            movieInfo.appendChild(movieYear);

            movieDiv.appendChild(movieInfo);
            moviesDiv.appendChild(movieDiv);
        });
    } else {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'No movies found!';
        moviesDiv.appendChild(errorMsg);
    }
}
