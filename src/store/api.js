import axios from 'axios';
import {store} from './index'


var API_URL = 'http://localhost:3001'

export const request = axios.create({
        baseURL: API_URL, 
        headers: {
            "Content-Type": "application/json",
        }
    },
)

request.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("axios sccess")
    return response;
  }, function (error) {
      console.log("axios error")
    if (401 === error.response.status) {
        console.log("dispatc logot")
        store.dispatch('logout');
    }
    console.log(error.response);
    return Promise.reject(error);
  });