<template>
  <div v-if="movie != null" class="details">
    <section class="details__hero">
      <div class="details__title">
        <h2>{{ movie.title }}</h2>
        <p v-if="movie.numVotes">voted for by {{ movie.numVotes }} people</p>
      </div>
    </section>
    <section class="details__content">
      <p v-for="summary in movie.plotSummary" :key="summary" class="summary">
        {{
            movie.plotSummary?.length !=0 ? summary+".":
           "There is no plot summary for this movie"
        }}
      </p>

<section v-if="hasMovie" class="movie__reviews">
       <h2>Movie Reviews</h2>
      <div class="reviews">
        <div
          v-for="review in movie.reviews"
          :key="review.slice(1, 10)"
          class="single__review"
        >
          <blockquote>
            {{ review }}
          </blockquote>
          <p>@Anonymous</p>
        </div>
      </div>
</section>
<div v-else> Loading movie details</div>
   
    </section>
  </div>
  <div v-else class="error">Something went wrong</div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      movie: {},
      hasMovie: false
    };
  },
  mounted() {
    this.id = this.$route.params.id;

    const buildUrl = `https://ott-details.p.rapidapi.com/getadditionalDetails?imdbid=${this.id}`;
    fetch(buildUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.VUE_APP_API_KEY,
        "x-rapidapi-host": "ott-details.p.rapidapi.com",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        let { title, plotSummary, numVotes, reviews } = response;
        console.log(title);
        console.log(numVotes);
        console.log(plotSummary.length);
        console.log(reviews);

        this.movie.title = title;
        this.movie.numVotes = numVotes;
        this.movie.plotSummary = plotSummary.split('.');
        this.movie.reviews = reviews;
        
        this.hasMovie = true;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style>
.details {
  display: flex;
  flex-direction: column;
}
.details__hero {
  width: 100%;
  position: relative;
}

/* .details__hero img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
} */

.details__title {
  padding: 20px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  margin-bottom: 20px;
}

.details__title h2 {
  font-size: 40px;
  font-weight: normal;
  letter-spacing: 1.5px;
  margin-bottom: 5px;
  color: #ffdc60;
}
.details__title p {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-bottom: 5px;
  color: #eedfa9;
}

.details__content {
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.summary {
  color: rgb(71, 71, 71);
  font-size: 16px;
  min-width: 500px;
  width: 70%;
  letter-spacing: .5px;
  text-align: justify;
  text-transform: capitalize;
  margin-bottom: 10px;
}

.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 20px;
  gap: 10px;
  background-color: #eee;
}

.single__review {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: left;
}

.single__review p {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
}
</style>