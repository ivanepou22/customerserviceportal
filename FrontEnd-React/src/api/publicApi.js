import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const publicApi = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default publicApi;