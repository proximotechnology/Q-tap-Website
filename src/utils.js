import axios from "axios"
// export const BASE_URL = 'https://api.qutap.co/api/'
// export const BASE_URL_IMAGE = 'https://api.qutap.co/'
export const BASE_URL = 'https://highleveltecknology.com/Qtap/api/'
export const BASE_URL_IMAGE = 'https://highleveltecknology.com/Qtap/'
export const DASHBOARD_URL = ""

export const formateDate = (date) => {
    const newDate = new Date(date);

    return (

        newDate.toLocaleString('en-US', {
            timeZone: 'Africa/Cairo',
            dateStyle: 'medium',
            timeStyle: 'short',
        })

    );
}
// take cart and id to cheek
export const isAllItemComeFromSameBranch = (cart, branchID) => {
    if (!Array.isArray(cart) || cart.length === 0) return true; // assume valid if empty
    return cart.every(item => {
        return Number(item.branchId) === branchID
    });
}
export const fetchShopsData = async () => {
    try {
        // setIsLoading(true)
        const response = await axios.get(`${BASE_URL}menu_all_restaurants`)
        return response.data.data
        // setShops(response.data.data)
    } catch (error) {
        console.log(error)
    }
}
export const fetchData = async (endPoint, setIsLoading) => {
    try {
        setIsLoading(true)
        const response = await axios.get(`${BASE_URL}${endPoint}`) // array of object [{...} , ... , {...}]
        return (response)
    } catch (error) {
        console.log(error)
        throw error;
    } finally {
        setIsLoading(false)
    }

}
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
        console.log(error)
        throw error;
    }

}
/* 
@param
cartItem [ {sizePrice , quantity , tax,discount{discount} , selectedExtra[{price}] ,selectedOptions[{price}] ,}]
*/

export const calculateOrderPriceDetailed = (cartItems, setSubTotal, setTax, setDiscount, setTotalPrice, discountCode) => {
   
    let subTotal = 0;
    let tax = 0;
    let discount = 0;

    if (cartItems) {
        cartItems.map(item => {
            let { itemSubTotal, itemDiscount, itemTax } = itemPriceDetailsCalculation(item)
            subTotal += itemSubTotal * Number(item.SelectedQuantity)
            discount += itemDiscount * Number(item.SelectedQuantity)
            tax += itemTax * Number(item.SelectedQuantity)
        })
    }
    setSubTotal((subTotal - discount).toFixed(2)) // sub here is new price of items 
    setTax(tax.toFixed(2))
    // setDiscount(discount.toFixed(2))

    if (discountCode) {
        setDiscount(((subTotal - discount) * (Number(discountCode?.discount ?? 0) / 100)).toFixed(2))
    }
    setTotalPrice((subTotal + tax - discount).toFixed(2))
}
export const itemPriceDetailsCalculation = (item) => {
    /* item : { special , selectedSize , Tax, discount,selectedExtra,selectedOptions, 
    price_small,price_medium ,price_large}  */
    let subTotal = 0 // based on  spicial or normal => size / extra / option
    let discount = 0
    let tax = 0
    if (item.special) {
        subTotal = Number(item.special.priceAfter)
    } else {
        if (item.selectedSize === 'L')
            subTotal = Number(item.price_large)
        if (item.selectedSize === 'M')
            subTotal = Number(item.price_medium)
        if (item.selectedSize === 'S')
            subTotal = Number(item.price_small)
    }
    if (item.Tax) tax += subTotal * Number(item.Tax) / 100

    if (item.discount) {
        if (!item.special) {
            discount += subTotal * (Number(item.discount) / 100);
        }
    }
    if (item.selectedExtra) item.selectedExtra.map(extra => subTotal += Number(extra.price))
    if (item.selectedOptions) item.selectedOptions.map(options => subTotal += Number(options.price))

        console.log(tax,">>",subTotal,">>",discount)

    return { itemSubTotal: subTotal, itemDiscount: discount, itemTax: tax }

}
export const egyptCities = [
    { name: "Cairo", region: "Nile Valley & Delta" },
    { name: "Giza", region: "Nile Valley & Delta" },
    { name: "Alexandria", region: "Nile Valley & Delta" },
    { name: "Luxor", region: "Nile Valley & Delta" },
    { name: "Aswan", region: "Nile Valley & Delta" },
    { name: "Asyut", region: "Nile Valley & Delta" },
    { name: "Minya", region: "Nile Valley & Delta" },
    { name: "Beni Suef", region: "Nile Valley & Delta" },
    { name: "Qena", region: "Nile Valley & Delta" },
    { name: "Sohag", region: "Nile Valley & Delta" },

    { name: "Port Said", region: "Suez Canal & Sinai" },
    { name: "Suez", region: "Suez Canal & Sinai" },
    { name: "Ismailia", region: "Suez Canal & Sinai" },
    { name: "El Arish", region: "Suez Canal & Sinai" },
    { name: "Sharm El-Sheikh", region: "Suez Canal & Sinai" },
    { name: "Dahab", region: "Suez Canal & Sinai" },

    { name: "Siwa Oasis", region: "Western Desert" },
    { name: "Bahariya Oasis", region: "Western Desert" },
    { name: "Farafra Oasis", region: "Western Desert" },
    { name: "Dakhla Oasis", region: "Western Desert" },
    { name: "Kharga Oasis", region: "Western Desert" },

    { name: "Hurghada", region: "Red Sea Coast" },
    { name: "Marsa Alam", region: "Red Sea Coast" },
    { name: "Safaga", region: "Red Sea Coast" },

    { name: "Tanta", region: "Delta Cities" },
    { name: "Mansoura", region: "Delta Cities" },
    { name: "Zagazig", region: "Delta Cities" },
    { name: "Damietta", region: "Delta Cities" },
    { name: "El-Mahalla El-Kubra", region: "Delta Cities" },

    { name: "New Administrative Capital", region: "New Urban Communities" },
    { name: "6th of October City", region: "New Urban Communities" },
    { name: "New Cairo", region: "New Urban Communities" },
    { name: "Sheikh Zayed City", region: "New Urban Communities" },
    { name: "Sadat City", region: "New Urban Communities" },
    { name: "10th of Ramadan City", region: "New Urban Communities" },

    { name: "Faiyum", region: "Other Notable Cities" },
    { name: "Kom Ombo", region: "Other Notable Cities" },
    { name: "Edfu", region: "Other Notable Cities" },
    { name: "Ras Ghareb", region: "Other Notable Cities" },
    { name: "St. Catherine", region: "Other Notable Cities" }
];

// Example usage:
// Filter cities by region
// const nileCities = egyptCities.filter(city => city.region === "Nile Valley & Delta");