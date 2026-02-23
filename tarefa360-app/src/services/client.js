import axios from 'axios';

export const HTTPClient = axios.create({
    baseURL: "http://localhost:5162",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        "Content-Type": "application/json; charset=utf-8"
    }
})