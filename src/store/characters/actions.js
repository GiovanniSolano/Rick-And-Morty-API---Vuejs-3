
import rickAndMortyApi from "@/api/index";
import axios from "axios";

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

export const getCharacterById = async({commit}, character_id) => {

    try {

        let petitionArray = [];
        const { data } = await rickAndMortyApi.get(`/character/${character_id}`);


        // Get three episodes
        if(data.episode.length > 0) {
            petitionArray = data.episode.slice(data.episode, 3);
        }

        //Get location
        if(data.location.url) {
            petitionArray.push(data.location.url);
        }

        petitionArray = petitionArray.map((element) => {
            return axios.get(element);
        });

        const resp = await Promise.all(petitionArray);
        const {data:location} = resp.pop();

        data.location = location;
        data.episode = resp.map((episode) => episode.data);

        commit('setCharacter', data);

        return {ok: true}
        
    } catch (error) {
        return {ok: false, message: 'Error de conexión'}
    }

}