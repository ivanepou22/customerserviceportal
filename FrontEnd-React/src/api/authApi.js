import axios from 'axios';

const API_BASE = 'http://localhost:5020/api/v1';

const api = axios.create({
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

export function getAccessToken() {
    return localStorage.getItem('token') || localStorage.getItem('accessToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function setTokens({ accessToken, refreshToken, token }) {
    const access = accessToken || token;
    if (access) {
        localStorage.setItem('token', access);
        localStorage.setItem('accessToken', access);
    }
    if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
    }
}

export function clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
}

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        const url = originalRequest.url || '';
        const isRefreshCall = url.includes('/auth/refresh');
        const isLoginCall = url.endsWith('/auth') || url.endsWith('/auth/');
        const isSignupCall = url.includes('/auth/signup') || url.includes('/auth/register');

        if (
            error.response?.status !== 401 ||
            originalRequest._retry ||
            isRefreshCall ||
            isLoginCall ||
            isSignupCall
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
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            clearTokens();
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
            setTokens({
                accessToken: newAccess,
                refreshToken: data.refreshToken,
            });

            processQueue(null, newAccess);

            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            originalRequest.headers['x-auth-token'] = newAccess;
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            clearTokens();
            window.location.href = '/';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;