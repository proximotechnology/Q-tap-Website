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