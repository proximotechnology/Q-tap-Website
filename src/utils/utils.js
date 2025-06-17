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
    // get basic price of the meal 
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
    
    // calculate discount base on the basic price
    if (item.discount) {
        if (!item.special) {
            discount += subTotal * (Number(item.discount) / 100);
        }
    }

    // add options price to subtotal
    if (item.selectedExtra) item.selectedExtra.map(extra => subTotal += Number(extra.price))

    if (item.selectedOptions) item.selectedOptions.map(options => subTotal += Number(options.price))
    // calculate tax on the total price of item (basic + extra + options)
    if (item.Tax) tax += (subTotal) * Number(item.Tax) / 100

    

    return { itemSubTotal: subTotal, itemDiscount: discount, itemTax: tax }

}


export const searchMeals = (branch, query) => {
    const results = [];
    if (query === "") return [];
    branch?.cat_meal?.forEach((category) => {
        category.meals.forEach((meal) => {
            
            if (meal.name.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    meal,
                    category: category.name,
                    branch: branch.name,
                });
            }
        });
    });


    return results;
};