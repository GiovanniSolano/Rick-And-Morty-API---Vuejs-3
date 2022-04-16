import { createStore } from 'vuex'

import character from "./characters/index";

export default createStore({
  modules: {
    character
  }
})
