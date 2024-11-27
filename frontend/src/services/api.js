import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authService = {
    login: async (credentials) => {
        return await api.post('/login', credentials);
    },
    logout: async () => {
        return await api.delete('/logout');
    },
    getMe: async () => {
        return await api.get('/me');
    }
};

export default api;