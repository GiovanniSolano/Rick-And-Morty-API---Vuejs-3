<template>
  <nav class="navbar sticky-top navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo.png"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Rick And Morty API
      </a>
      <span class="navbar-text text-white me-4"> Número de personajes: ({{numberMaxOfCharacters}}) - Página: {{pageNumber}} de {{maxPages}}</span>
    </div>
  </nav>
</template>

<script>
import useCharacters from '@/composables/useCharacters';
export default {
    setup() {

        const { pageNumber, numberMaxOfCharacters, maxPages } = useCharacters();

        return {
            pageNumber,
            numberMaxOfCharacters,
            maxPages
        };
    },
}
</script>
