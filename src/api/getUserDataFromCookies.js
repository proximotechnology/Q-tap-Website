import useUserStore from "@/store/userStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";


export const getUserDataFromCookies = async () => {
    
    try {
        const res = await axios.get(`${BASE_URL}checkCookies`, {
            withCredentials: true
        })
        
        
        return res.data.user
    } catch (error) {
        throw new Error(error.message)
    }
}
