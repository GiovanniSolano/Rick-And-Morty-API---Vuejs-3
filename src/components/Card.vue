<template>
  <div class="col">
    <div class="card pointer">
      <img
        :src="character.image"
        class="card-img-top img-thumbnail rounded"
        :key="character.name"
      />
      <div class="card-body">
        <h5 class="card-title">{{ character.name }}</h5>
        <p class="card-text">
          <span class="badge bg-primary">{{ character.status }}</span>
          <span class="badge ms-2 bg-secondary">{{ character.species }}</span>
          <span class="badge ms-2 bg-warning text-dark">{{
            character.type
          }}</span>
          <span class="badge ms-2 bg-success">{{ character.gender }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: Object,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.pointer {
  cursor: pointer;
}
</style>
