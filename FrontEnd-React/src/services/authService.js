import api, { setTokens } from "../api/authApi";

export const authService = {
    async login(email, password) {
        const response = await api.post("/auth", { email, password });
        const data = response.data;

        const accessToken = data.accessToken || data.token;
        const refreshToken = data.refreshToken;

        setTokens({ accessToken, refreshToken, token: accessToken });

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }

        return {
            user: data.user,
            token: accessToken,
            accessToken,
            refreshToken,
        };
    },
};