import axios from 'axios';

const instance = axios.create({
    baseURL: "https://americas.api.riotgames.com/"
})

export default instance;