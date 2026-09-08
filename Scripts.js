const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("search");
const yearFilter = document.getElementById("yearFilter");

let allMovies = movies || [];

function displayMovies(movieArray) {
  movieList.innerHTML = "";

  if (movieArray.length === 0) {
    movieList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No movies found. Try adjusting your search or filter.</div>';
    return;
  }

  movieArray.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie";

    card.innerHTML = `
      <div class="poster">
        ${
          movie.poster && movie.poster.trim()
            ? `<img src="${movie.poster}" alt="${movie.title}" style="width:100%;height:100%;object-fit:cover;">`
            : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 12px; text-align: center; padding: 20px;">🎬<br>${movie.title}</div>`
        }
      </div>

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.genre} • ${movie.year}</p>

        ${
          movie.video && movie.video.trim()
            ? `<a href="${movie.video}" class="btn" target="_blank">Watch</a>`
            : `<button class="btn" onclick="alert('Video coming soon!')">Watch</button>`
        }
      </div>
    `;

    movieList.appendChild(card);
  });
}

function searchMovies() {
  const text = searchInput.value.toLowerCase();
  const year = yearFilter.value;

  const filteredMovies = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(text) ||
                         movie.genre.toLowerCase().includes(text);
    
    const matchesYear = !year || movie.year.toString() === year || 
                       (year === "2020" && movie.year <= 2020);

    return matchesSearch && matchesYear;
  });

  displayMovies(filteredMovies);
}

function filterByYear() {
  searchMovies();
}

// Load movies on page load
document.addEventListener("DOMContentLoaded", () => {
  if (movies && Array.isArray(movies)) {
    allMovies = movies;
    displayMovies(allMovies);
  } else {
    console.error("Movies data not loaded properly");
    showError("Failed to load movies. Check Movie.js file.");
  }
});

// Event listeners
searchInput.addEventListener("input", searchMovies);
yearFilter.addEventListener("change", filterByYear);
