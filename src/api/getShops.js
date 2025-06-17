import { BASE_URL } from "@/utils/constants"
import axios from "axios"

export const fetchShopsData = async () => {
    try {
        // setIsLoading(true)
        const response = await axios.get(`${BASE_URL}menu_all_restaurants`)
        return response.data.data
        // setShops(response.data.data)
    } catch (error) {
        throw error;
    }
}