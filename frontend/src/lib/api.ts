import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token =
            typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
