import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export const apiCheckDiscountCode = async (discountCode, branchId) => {
    /* {
    "brunch_id":"187",
    "code":"3"
} */
    try {
        const response = await axios.post(`${BASE_URL}check_discount_code`, {
            code: discountCode,
            brunch_id: branchId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return (response)
    } catch (error) {
        throw error;
    }

}