const movieTitle = document.getElementById("movieTitle");
const movieRating = document.getElementById("movieRating");
const movieReview = document.getElementById("movieReview");
const addBtn = document.getElementById("addBtn");
const movieList = document.getElementById("movieList");
const emptyMsg = document.getElementById("emptyMsg");

let movies = [];

function renderMovies() {
  if (movies.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  // Clear current UI elements
  const cards = movieList.querySelectorAll(".movie-card");
  cards.forEach(card => card.remove());

  // Render movie list dynamically
  movies.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const starEmojis = "⭐".repeat(movie.rating);

    card.innerHTML = `
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <div class="stars">${starEmojis} (${movie.rating}/5)</div>
        ${movie.review ? `<p class="review">"${movie.review}"</p>` : ''}
      </div>
      <button class="delete-btn" onclick="removeMovie(${index})">Remove</button>
    `;

    movieList.appendChild(card);
  });
}

function addMovie() {
  const title = movieTitle.value.trim();
  const rating = parseInt(movieRating.value, 10);
  const review = movieReview.value.trim();

  if (!title) {
    alert("Please enter a movie title.");
    return;
  }

  movies.push({ title, rating, review });
  
  // Clear inputs after addition
  movieTitle.value = "";
  movieReview.value = "";
  movieRating.value = "5";

  renderMovies();
}

function removeMovie(index) {
  movies.splice(index, 1);
  renderMovies();
}

addBtn.addEventListener("click", addMovie);