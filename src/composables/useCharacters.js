import { computed } from "vue";
import { useStore } from "vuex"


const useCharacters = () => {

    const store = useStore();

    const getCharacters = async () => {
        const resp = await store.dispatch('character/getCharacters');
        return resp;
    };

    const getCharacterById = async (character_id) => {
        const resp = await store.dispatch('character/getCharacterById', character_id);
        return resp;
    };

    const changePage = async (page) => {
        store.commit('character/setIsLoading', true);
        const resp = await store.dispatch('character/getCharacters', page);
        return resp;
    }

    const emptyCharacter = () => {
        store.commit('character/setEmptyCharacter');
    }

    return {
        getCharacters,
        getCharacterById,
        changePage,
        emptyCharacter,
        characters: computed(() => store.state.character.characters),
        isLoading: computed(() => store.getters['character/isLoading']),
        pageNumber: computed(() => store.getters['character/pageNumber']),
        maxPages: computed(() => store.getters['character/maxPages']),
        character: computed(() => store.state.character.character),
        numberMaxOfCharacters: computed(() => store.getters['character/numberMaxOfCharacters']),
    }

}

export default useCharacters;