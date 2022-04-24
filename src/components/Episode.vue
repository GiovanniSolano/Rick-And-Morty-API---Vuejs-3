<template>
  <div class="col">
    <div class="card h-100 text-dark bg-light">
      <div class="card-header text-white bg-dark">{{episode.air_date}}</div>
      <div class="card-body">
        <h5 class="card-title">{{episode.name}}</h5>
        <p class="card-text">
          {{episode.episode}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
    episode: Object,
  },

  setup() {
  }
};
</script>

<style scoped>
.card {
    max-height: 180px;
}
</style>
