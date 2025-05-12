import axios from "axios"

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


export const BASE_URL = 'https://api.qutap.co/api/'
export const BASE_URL_IMAGE = 'https://api.qutap.co/'

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
/* 
@param
cartItem [ {sizePrice , quantity , tax,discount{discount} , selectedExtra[{price}] ,selectedOptions[{price}] ,}]
*/

export const calculateOrderPriceDetailed = (cartItems, setSubTotal, setTax, setDiscount, setTotalPrice) => {
    let subTotal = 0;
    let tax = 0;
    let discount = 0;
    let totalPrice = 0;

    if (cartItems) {
        cartItems.map(item => {
            let itemSubTotal = 0;
            itemSubTotal += Number(item.sizePrice) * item.quantity
            if (item.selectedExtra) item.selectedExtra.map(extra => itemSubTotal += Number(extra.price) * item.quantity)
            if (item.selectedOptions) item.selectedOptions.map(options => itemSubTotal += Number(options.price) * item.quantity)

            subTotal += itemSubTotal

            if (item.tax) tax += itemSubTotal * Number(item.tax) / 100 * item.quantity
            if (item.discount) discount += itemSubTotal * Number(item.discount.discount) / 100 * item.quantity

        })
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