<template>

  <NavBar/>
  <CardList />

</template>

<script>

import NavBar from "@/components/NavBar.vue";
import CardList from "@/components/CardList.vue";

export default {
  name: 'Home',
  components: {
    NavBar,
    CardList
  }
}
</script>
