import api from "../api/authApi";
export const authService = {
    async login(email, password) {
        const response = await api.post('/auth', { email, password });
        return response.data;
    }
};