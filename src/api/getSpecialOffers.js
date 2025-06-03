import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export const getSpecialOffers = async (branchId) => {
    try {

        const response = await axios.get(`${BASE_URL}meals_special_offers`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                brunch_id: branchId
            }
        });

        // const response = await axios({
        //     method: 'get',
        //     url: `${BASE_URL}${endPoint}`,
        //     data: {
        //         brunch_id: branchId,
        //     },
        //     headers: {

        //     },
        // });

        if (response.data) {
            const formattedOffers = response.data.map(offer => ({
                id: offer.id,
                item: offer.meals_id,
                discount: offer.discount,
                priceBefore: offer.before_discount,
                priceAfter: offer.after_discount,
                name: offer.name || '', // Ensure name is included
                description: offer.description || '', // Ensure description is included
                isEditing: false,
                img: offer.img
            }));
            return (formattedOffers);
        }
    } catch (error) {
        console.error('Error fetching discounts:', error);
        return null
    }
};