import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/'

export class HttpService{
    constructor(){
        axios.defaults.baseURL = BASE_URL
        axios.defaults.headers.accept = 'application/json'
        this.axios = axios
    }
}