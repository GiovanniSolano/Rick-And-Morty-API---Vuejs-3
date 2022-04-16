import { computed } from "vue";
import { useStore } from "vuex"


const useCharacters = () => {

    const store = useStore();

    const getCharacters = async () => {
        const resp = await store.dispatch('character/getCharacters');
        return resp;
    };

    return {
        getCharacters,
        characters: computed(() => store.state.character.characters),
        isLoading: computed(() => store.getters['character/isLoading']),
        pageNumber: computed(() => store.getters['character/pageNumber']),
        maxPages: computed(() => store.getters['character/maxPages']),
        numberMaxOfCharacters: computed(() => store.getters['character/numberMaxOfCharacters']),
        changePage: async (page) => {
            store.commit('character/setIsLoading', true);
            const resp = await store.dispatch('character/getCharacters', page);
            return resp;
        }
    }

}

export default useCharacters;