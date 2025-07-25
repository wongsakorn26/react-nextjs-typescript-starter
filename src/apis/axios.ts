import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/th',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api