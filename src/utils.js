import axios from "axios"
export const BASE_URL = 'https://api.qutap.co/api/'
export const BASE_URL_IMAGE = 'https://api.qutap.co/'
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
        console.log("item.branchId === branchID",item , "  ", item.brunch_id ,"===", branchID)
        return Number(item.branchId) === branchID
    });
}
export const fetchShopsData = async () => {
    try {
        // setIsLoading(true)
        const response = await axios.get(`${BASE_URL}menu_all_restaurants`)
        console.log(response.data.data) // array of object [{...} , ... , {...}]
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
    let totalPrice = 0;
    /* 
    this item come from local storage not the same as the api 
     item = {
      branchId: "187",
      catId: "16",
      discount: {
        id: 31,
        code: "1",
        discount: "1", 
        status: "active",
        brunch_id: 187,
      },
      id: 26,
      image: "storage/images/MOL78bsFb3vwpDDUN4OqZwcMXGCd1xoUN2bZx39q.jpg",
      name: "1",
      price: "2.00",
      quantity: 1,
      selectedExtra: [],
      selectedOptions: [],
      selectedSize: "L",
      shopId: "159",
      sizePrice: "1",
      special: null,
      tax: "1",
    };
    */
    if (cartItems) {
        cartItems.map(item => {
            let itemSubTotal = 0;
            itemSubTotal += item.special ? Number(item.special.priceAfter) * item.quantity : Number(item.sizePrice) * item.quantity
            if (item.selectedExtra) item.selectedExtra.map(extra => itemSubTotal += Number(extra.price) * item.quantity)
            if (item.selectedOptions) item.selectedOptions.map(options => itemSubTotal += Number(options.price) * item.quantity)

            subTotal += itemSubTotal

            if (item.tax) tax += itemSubTotal * Number(item.tax) / 100 * item.quantity

            if (item.discount && discountCode === item.discount.code) {
                if (!item.special) {
                    discount += itemSubTotal * (Number(item.discount.discount) / 100);
                }
            }

        })
        console.log("discount", discount)
    }
    setSubTotal(subTotal.toFixed(2))
    setTax(tax.toFixed(2))
    setDiscount(discount.toFixed(2))
    setTotalPrice((subTotal + tax - discount).toFixed(2))
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