const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("search");

function displayMovies(movieArray) {
  movieList.innerHTML = "";

  movieArray.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie";

    card.innerHTML = `
      <div class="poster">
        ${
          movie.poster
            ? `<img src="${movie.poster}" alt="${movie.title}" style="width:100%;height:100%;object-fit:cover;">`
            : "Movie Poster"
        }
      </div>

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.genre} • ${movie.year}</p>

        ${
          movie.video
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

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(text) ||
    movie.genre.toLowerCase().includes(text)
  );

  displayMovies(filteredMovies);
}

searchInput.addEventListener("input", searchMovies);

displayMovies(movies);
