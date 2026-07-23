import api from "../api/authApi";

// export const authService = {
//     async login(email, password) {
//         const response = await fetch(`${API_BASE}/auth`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Login failed: ${response.status}`);
//         }

//         const data = await response.json();

//         if (!data) {
//             throw new Error("No data received from server");
//         }

//         const userData = data.user || data.data?.user || data;
//         const token = data.token || data.accessToken || data.data?.token;

//         if (!userData || !userData.email) {
//             throw new Error("Invalid user data received");
//         }

//         return { user: userData, token };
//     }
// };

export const authService = {
    async login(email, password) {
        const response = await api.post('/auth', { email, password });
        return response.data;
    }
};