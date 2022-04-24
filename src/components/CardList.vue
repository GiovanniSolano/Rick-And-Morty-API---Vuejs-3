<template>
  <div class="alert alert-danger" role="alert" v-if="showMessage">
    "¡No se encontró información, posible error de conexión!
  </div>
  <Spinner v-if="isLoading" />
  <div class="flex-container" v-else>
    <div class="row justify-content-center row-cols-1 row-cols-md-3 g-4 m-4">
      <Card
        v-for="character in characters"
        :character="character"
        :key="character.id"
        @click="openModal(character)"
      />
    </div>
    <div class="col-12">
      <div
        class="btn-group mt-2 mb-5"
        role="group"
        v-if="!isLoading && characters.length > 0"
      >
        <button
          class="btn btn-outline-dark"
          @click="onChangePage(-1)"
          :disabled="page == 1"
        >
          Anteriores
        </button>
        <button
          class="btn btn-outline-dark"
          @click="onChangePage(+1)"
          :disabled="page == maxPages"
        >
          Siguientes
        </button>
      </div>
    </div>
  </div>

  <modal v-if="isOpen" @on:close="closeModal" :title="character.name">
    <template v-slot:body_title>
        <div class="mb-4" v-if="character.location.name">
          <h5 class="color-vue">Ubicación:</h5>
          <h2>{{ character.location.name }}</h2>
        </div>
        <h5 class="m-3 color-vue" v-else>SIN UBICACIÓN</h5>
    </template>

    <template v-slot:body>
      <div class="m-1" v-if="character.episode.length > 0">
        <h5 class="color-vue">Episodios:</h5>
        <div class="row justify-content-center row-cols-1 row-cols-md-3 g-4">
          <Episode v-for="episode in character.episode" :episode="episode" :key="episode.id" />
        </div>
      </div>
      <h5 class="m-3 color-vue" v-else>SIN EPISODIOS</h5>
    </template>

    <template v-slot:footer>
      <button
        type="button"
        @click="closeModal"
        class="btn btn-dark"
        data-bs-dismiss="modal"
      >
        Cerrar
      </button>
    </template>
  </modal>
</template>

<script>
import useCharacters from "@/composables/useCharacters";
import { defineAsyncComponent, onMounted, ref } from "@vue/runtime-core";

export default {
  components: {
    Card: defineAsyncComponent(() => import("./Card.vue")),
    Spinner: defineAsyncComponent(() => import("./Spinner.vue")),
    Modal: defineAsyncComponent(() => import("./Modal.vue")),
    Episode: defineAsyncComponent(() => import("./Episode.vue")),
  },
  setup() {
    let page = ref(1);
    let showMessage = ref(false);
    const isOpen = ref(false);
    const selectedCharacter = ref("");
    const {
      getCharacters,
      getCharacterById,
      emptyCharacter,
      characters,
      character,
      isLoading,
      changePage,
      maxPages,
    } = useCharacters();

    onMounted(async () => {
      const resp = await getCharacters();

      if (!resp.ok) {
        showMessage.value = true;
      }
    });

    return {
      characters,
      character,
      isLoading,
      page,
      showMessage,
      maxPages,
      isOpen,
      selectedCharacter,

      openModal: async (character) => {
        await getCharacterById(character.id);
        isOpen.value = true;
      },
      closeModal: () => {
        isOpen.value = false;
        emptyCharacter();
      },

      onChangePage: async (value) => {
        page.value += value;

        if (page.value < 1) page.value = 1;

        if (page.value > maxPages) page.value = maxPages;

        const resp = await changePage(page.value);

        if (!resp.ok) {
          showMessage.value = true;
        }

        window.scrollTo(0, 0);
      },
    };
  },
};
</script>

<style scoped>
  .color-vue {
    color: #3FB883;
  }
</style>
