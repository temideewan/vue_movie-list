<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-header">Welcome to the movies</h1>
      <a href="#movie__list" class="hero-cta">Continue to the movie list</a>
    </section>

    <section id="movie__list" class="movies">
      <h2 class="movie__list--title">Movie List</h2>

      <div v-if="isError" class="error">
        {{error}}
      </div>
      <div v-else-if="movies.length > 0 && !isError" class="list_movies">
        <div v-for="movie in movies" :key="movie.id" class="movie__card">
          <img :src="movie.url" class="movie__image" />
          <h3 class="movie__title"> {{movie.title}} </h3>
          <p class="movie__synopsis">
            {{movie.synopsis}}
          </p>
          <div class="meta">
            <div class="category">
              <p v-for="genre in movie.genre" :key='genre'> {{genre}} </p>
            </div>
            <p class="year">Released in {{movie.year}}</p>
          </div>
          <router-link :to="{name: 'Details', params: {id:movie.id}}" @click="pushDets"  class="movie__cta">View more</router-link>
        </div>
      </div>
      <div v-else>
        Loading movies ...
      </div>
    </section>
  </div>
</template>

<script>

function FetchException(message){
  this.message = message;
  this.name = 'fetchException';
}

export default {
  name: "Home",
  components: {},

  data() {
    return {
      movies: [],
      isError: false,
      error: ''
    };
  },

  mounted() {
    fetch("https://ott-details.p.rapidapi.com/getnew?region=US&page=1", {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.VUE_APP_API_KEY,
        "x-rapidapi-host": "ott-details.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response);
        if(response.status === 200){

          return response.json();
        } else{
          throw new FetchException('Could not fetch the requested data');
        }
      })
      .then((response) => {
        let { results } = response;

        this.movies = results.map((singleMovie) => {
          return {
            url: singleMovie.imageurl[0],
            genre: singleMovie.genre,
            id: singleMovie.imdbid,
            title: singleMovie.title,
            synopsis: singleMovie.synopsis,
            year: singleMovie.released,
          };
        });

        console.log(results);
        console.log(this.movies);

      })
      .catch((err) => {
        this.isError = true;
        this.error ='Something went wrong trying to get the movies please check your internet connection and try again';
        console.error(err.name);
      });
  },
};
</script>

<style>
.hero {
  height: calc(100vh - 60px);
  background-image: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.322),
      rgba(0, 0, 0, 0.849)
    ),
    url("../../assets/movies.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero h1 {
  font-size: 70px;
  color: #fdfcf5;
  letter-spacing: 1px;
  margin-bottom: 20px;
  font-weight: normal;
}

.hero a,
.hero a:visited,
.hero a:active {
  text-decoration: none;
  color: rgba(22, 22, 22, 0.63);
  padding: 10px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  background-color: #ffdc60;
  transition: all 0.3s ease;
}
.hero a:hover,
.hero a:focus {
  transform: translateY(-5px);
  background-color: #f1c31c;
}

.movies {
  padding: 50px 80px;
}

.movie__list--title {
  font-size: 35px;
  margin-bottom: 40px;
  font-weight: bold;
}

.movie__card img {
  width: 100%;
}

.movie__card {
  width: 650px;
  max-width: 90%;
  height: 100%;
  border-radius: 5px;
  background-color: rgb(252, 246, 223);
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.movie__image {
  min-width: 100%;
  height: 60%;
  max-height: 400px;
  border-radius: inherit;
  object-fit: cover;
}

.movie__title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 10px;
}

.movie__synopsis {
  text-align: left;
  font-size: 15px;
  margin-left: 10px;
}

.movie__cta {
  width: 60%;
  background-color: #ffdc60;
  color: #1b1b1b;
  margin: auto auto 0;
  padding: 10px 20px;
  border-radius: inherit;
  text-decoration: none;
  background-color: #ffdc60;
  transition: all 0.3s ease;
}
.movie__cta:hover,
.movie__cta:focus {
  transform: translateY(-5px);
  background-color: #f1c31c;
}

.list_movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  align-items: center;
  justify-items: center;
}

.category p {
  display: inline-block;
  background-color: rgb(161, 133, 5);
  color: rgb(244, 253, 255);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
}

.category {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px;
}
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.year {
  font-size: 13px;
  color: rgb(46, 44, 37);
  font-weight: normal;
  letter-spacing: 1px;
}
</style>