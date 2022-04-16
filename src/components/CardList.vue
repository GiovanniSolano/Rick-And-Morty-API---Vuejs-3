<template>
    <div class="alert alert-danger" role="alert" v-if="showMessage">
        "¡No se encontró información, posible error de conexión!
    </div>
    <Spinner v-if="isLoading" />
    <div class="flex-container" v-else>
        <div class="row justify-content-center row-cols-1 row-cols-md-3 g-4 m-4">
            <Card v-for="character in characters" :character="character" :key="character.id" />
        </div>
        <div class="col-12">
          <div class="btn-group mt-2 mb-5" role="group" v-if="!isLoading && characters.length > 0">
              <button class="btn btn-outline-dark" @click="onChangePage(-1)" :disabled="page == 1">Anteriores</button>
              <button class="btn btn-outline-dark" @click="onChangePage(+1)" :disabled="page == maxPages">Siguientes</button>
          </div>
        </div>
    </div>
</template>

<script>
import useCharacters from "@/composables/useCharacters";
import { defineAsyncComponent, onMounted, ref } from "@vue/runtime-core";

export default {
  components: {
    Card: defineAsyncComponent(() => import("./Card.vue")),
    Spinner: defineAsyncComponent(() => import("./Spinner.vue")),
  },
  setup() {
      
      let page = ref(1);
      let showMessage = ref(false);
      const { getCharacters, characters, isLoading, changePage, maxPages } = useCharacters();

    onMounted(async () => {
        const resp = await getCharacters();
        
        if(!resp.ok) {
            showMessage.value = true;
        }
    });

    return {
      characters,
      isLoading,
      page,
      showMessage,
      maxPages,

      onChangePage: async (value) =>  {

        page.value += value;

        if(page.value < 1) page.value = 1;
        
        if(page.value > maxPages) page.value = maxPages;
        
        const resp = await changePage(page.value);

        if(!resp.ok) {
            showMessage.value = true;
        }

        window.scrollTo(0,0);
        
      }
    };
  },
};
</script>

<style scoped>

</style>
