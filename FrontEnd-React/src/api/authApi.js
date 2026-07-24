import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,   // Important for cookies if you use them
});

// Request Interceptor - Attach Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(`${API_BASE}/auth/refresh`, {}, {
                    withCredentials: true
                });

                const newToken = refreshResponse.data.token || refreshResponse.data.accessToken;

                if (newToken) {
                    localStorage.setItem('token', newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);   // Retry
                }
            } catch (refreshError) {
                console.error("Token refresh failed", refreshError);
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default api;