export const createMeal = ({
    id,
    name,
    selectedSize,
    price,
    restaurantId,
    branchId,
    selectedExtra = [],
    selectedOptions = [],
    quantity = 1,
    discount = 0,
    tax = 0,
}) => {
    if (id === undefined || name === undefined || selectedSize === undefined || price === undefined || restaurantId === undefined || branchId === undefined) {
        throw new Error('Missing required meal fields');
    }

    return {
        id,
        restaurantId,
        branchId,
        name,
        selectedSize,
        selectedExtra,
        selectedOptions,
        quantity,
        price,
        discount,
        tax,
    };
};
export const createSpecialOfferMeal = ({
    id,
    name,
    price,
    restaurantId,
    branchId,
    specialId ,
    selectedExtra = [],
    selectedOptions = [],
    quantity = 1,
    discount = 0,
    tax = 0,
}) => {
    console.log(id,
    name,
    price,
    restaurantId,
    branchId,
    specialId )
    if (id === undefined || name === undefined ||  price === undefined ||specialId === undefined || restaurantId === undefined || branchId === undefined) {
        throw new Error('Missing required special meal fields');
    }

    return {
        id,
        restaurantId,
        branchId,
        name,
        specialId,
        selectedExtra,
        selectedOptions,
        quantity,
        price,
        discount,
        tax,
    };
};
