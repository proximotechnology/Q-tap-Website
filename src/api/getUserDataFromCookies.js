import { BASE_URL } from "@/utils/constants";
import axios from "axios";


export const getUserDataFromCookies = () => {
    console.log("==================>")
    axios.get(`${BASE_URL}checkCookies`, {
        withCredentials: true
    })
        .then(response => {
            console.log('==================>User data:', response.data);
        })
        .catch(error => {
            console.error('==================>Unauthenticated or error:', error.response?.data || error.message);
        });
}