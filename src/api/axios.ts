import axios from 'axios';
const BASE_URL = process.env.API_ENDPOINT
export default axios.create({
    // baseURL: 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/th',
    baseURL: `http://localhost:5001`,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuth = axios.create({
    baseURL: `http://localhost:5001`,
    headers: {
        'Content-Type': 'application/json',
    }
})