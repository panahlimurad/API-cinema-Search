// API
const API = "https://api.themoviedb.org/3/search/movie?api_key=7e3d70e2d0fc85df0bfb0113024f1a15&query=titanic"
const poster = "https://image.tmdb.org/t/p/original/";

// DOM elements
const inputMovie = document.querySelector("#inputMovie");
const buttonMovie = document.querySelector("#buttonMovie");
const card = document.querySelector("#card");
const errorMessage = document.querySelector(".errorMessage");
const main = document.querySelector("#main");

// Popular films. When open page
function popularFilm() {
    
    const myPopular = fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=7e3d70e2d0fc85df0bfb0113024f1a15"
        );
        
        myPopular.then((response) => {
            
            let popularFilmData = response.json()
            
            console.log(popularFilmData);
            
            return popularFilmData
        }).then((data) => {
            showMovie(data.results)  
        })
        .catch((err) => {
            console.log("err", err);
        })
        
    }


// Show movies
function showMovie(data) {
        
    main.innerHTML = data.map((data) => {
        
        const { original_title, overview, poster_path, vote_average } = data;
        
        // rating number Fixed
        let rating = `${vote_average}`
        let mainRating = parseFloat(rating)
        let randomRating = mainRating.toFixed(1)

        return `<div class="card">
        <img src="${poster + poster_path}"/>
        <div class="aboutFilm">
        <h1>${original_title}</h1>
        <h2><span>${randomRating}</span></h2>
        </div>
        <div class="overview">
        <h3>${original_title}</h3>
        <p>${overview}</p>
        </div>
        </div>`;
        
    }
    )

}
    
// when user searh movie
buttonMovie.addEventListener("click", function () {
    
    const myPromise = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=7e3d70e2d0fc85df0bfb0113024f1a15&query=${inputMovie.value}`
      );
      
      myPromise
      .then((response) => {
          const myData = response.json();
          return myData;
        })
          .then((data) => {
              showMovie(data.results);
              console.log(data);
        })
        .catch((err) => {
         console.log("err", err);
        });

        inputMovie.value = " "
        
})
    
popularFilm()