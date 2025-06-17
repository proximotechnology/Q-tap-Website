// logout.js
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

export const logout = async () => {
    try {
        await axios.post(`${BASE_URL}logout`, null, {
            withCredentials: true, // 👈 sends cookies across origins
        });
    } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
    }
};
