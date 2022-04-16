const { default: axios } = require("axios");


const rickAndMortyApi = axios.create({
    baseURL: "https://rickandmortyapi.com/api"
});

export default rickAndMortyApi;