// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Persist auth on page refresh
//     useEffect(() => {
//         const savedUser = localStorage.getItem("user");
//         const token = localStorage.getItem("token");

//         if (savedUser && token) {
//             setUser(JSON.parse(savedUser));
//             setIsAuthenticated(true);
//         }
//         setLoading(false);
//     }, []);

//     // const login = (userData, token) => {
//     //     setUser(userData);
//     //     setIsAuthenticated(true);

//     //     localStorage.setItem("user", JSON.stringify(userData));
//     //     if (token) localStorage.setItem("token", token);
//     // };

//     const login = (userData, token) => {
//         setUser(userData);
//         setIsAuthenticated(true);

//         if (token) {
//             localStorage.setItem("token", token);
//         }
//         localStorage.setItem("user", JSON.stringify(userData));
//     };

//     const logout = () => {
//         setUser(null);
//         setIsAuthenticated(false);
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//     };

//     return (
//         <AuthContext.Provider value={{
//             isAuthenticated,
//             user,
//             loading,
//             login,
//             logout
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

import { createContext, useContext, useState, useEffect } from "react";
import { setTokens, clearTokens, getAccessToken } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = getAccessToken();

        if (savedUser && token) {
            try {
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            } catch {
                clearTokens();
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, accessToken, refreshToken) => {
        setUser(userData);
        setIsAuthenticated(true);

        setTokens({
            accessToken,
            refreshToken,
            token: accessToken,
        });
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        clearTokens();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};