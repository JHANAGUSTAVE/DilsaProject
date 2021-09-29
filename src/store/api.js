import axios from 'axios'

var API_URL = 'http://localhost:3001'

export const request = axios.create({
        baseURL: API_URL, 
        headers: {
            "Content-Type": "application/json",
        }
    },
)