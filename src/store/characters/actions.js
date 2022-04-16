
import rickAndMortyApi from "@/api/index";

export const getCharacters = async({commit}, page = 1) => {

    try {

        const { data } = await rickAndMortyApi.get(`/character/?page=${page}`);

        commit('setCharacters', [data, page]);

        return {ok: true}
        
    } catch (error) {
        commit('setIsLoading', false);
        return {ok: false, message: 'Error de conexión'}
    }

}