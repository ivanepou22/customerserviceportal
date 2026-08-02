import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const documentApi = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Attach access token
documentApi.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem('token') ||
            localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auto-refresh on 401
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
}

documentApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    originalRequest.headers['x-auth-token'] = token;
                    return documentApi(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            isRefreshing = false;
            processQueue(error, null);
            window.location.href = '/';
            return Promise.reject(error);
        }

        try {
            const { data } = await refreshClient.post('/auth/refresh', {
                refreshToken,
            });

            const newAccess = data.accessToken || data.token;
            localStorage.setItem('token', newAccess);
            localStorage.setItem('accessToken', newAccess);
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken);
            }

            processQueue(null, newAccess);

            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            originalRequest.headers['x-auth-token'] = newAccess;
            return documentApi(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default documentApi;