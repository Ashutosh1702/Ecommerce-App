import apiConfig from '../config/api.json';

const API_URL = apiConfig.baseUrl;

export const authService = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}${apiConfig.auth.login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async logout() {
        try {
            const response = await fetch(`${API_URL}${apiConfig.auth.logout}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    },

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getCurrentUser();
    }
}; 