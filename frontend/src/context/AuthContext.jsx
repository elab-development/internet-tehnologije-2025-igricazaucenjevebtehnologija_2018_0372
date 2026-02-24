import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists on refresh
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Decode JWT payload (atob decodes base64)
                const payload = JSON.parse(atob(token.split(".")[1]));

                // Optional: Check for expiration here
                if (payload.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    setUser(null);
                } else {
                    setUser(payload);
                }
            } catch (e) {
                console.error("TOKEN_PARSE_ERROR", e);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/")
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);