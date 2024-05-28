import axios from 'axios';

const instance = axios.create({
    baseURL: "https://americas.api.riotgames.com/"
})

const brasil = axios.create({
    baseURL: "https://br1.api.riotgames.com"
})

const key = "";


export default {instance, brasil, key};