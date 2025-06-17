import { areMealsEqual } from '@/utils/areMealsEquals';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            restaurantId: null,
            branchId: null,
            discountCode: null,
            meals: [],
            setDiscountCode: (value) => set({ discountCode: value }),

            cartItemsSubTotal: () => {
                return get().meals.reduce((sum, meal) => {
                    let basePrice = meal.price - meal.price * (meal.discount / 100)
                    if (meal.selectedExtra) {
                        meal.selectedExtra.map(extra => basePrice += Number(extra.price))
                    }
                    if (meal.selectedOptions) {
                        meal.selectedOptions.map(option => basePrice += Number(option.price))
                    }
                    return sum + (basePrice * meal.quantity)
                }, 0)
            },

            cartItemsTax: () => {
                return get().meals.reduce((sum, meal) => sum + meal.itemBasePrice *(meal.tax ?? 0)/100, 0)
            },


            cartItemTotalWithDiscountCode: () => {
                const subTotal = get().cartItemsSubTotal()
                const discount = get().cartItemDiscountWithDiscountCode()
                const tax = get().cartItemsTax()
                return subTotal + tax - discount;
            },

            cartItemDiscountWithDiscountCode: () => {
                const total = get().cartItemsSubTotal()
                const { discountCode } = get();
                return discountCode ? (total * discountCode?.discount) / 100 : 0
            },

            isCartEmpty: () => get().meals.length === 0,

            ///===============================================================================================

            addItemToCart: (newMeal) => {
                const { meals, restaurantId, branchId } = get();

                if (restaurantId === null && branchId === null) {
                    set({
                        restaurantId: newMeal.restaurantId,
                        branchId: newMeal.branchId,
                    });
                } else {
                    if (
                        restaurantId !== newMeal.restaurantId ||
                        branchId !== newMeal.branchId
                    ) {

                        console.warn('Meal is from a different restaurant/branch');
                        throw new Error('Meal is from a different restaurant/branch')
                    }
                }


                const existingIndex = meals.findIndex((meal) => meal.id === newMeal.id && meal.specialId === newMeal.specialId && areMealsEqual(meal, newMeal));

                if (existingIndex !== -1) {
                    const updatedMeals = [...meals];
                    updatedMeals[existingIndex].quantity += newMeal.quantity || 1;
                    set({ meals: updatedMeals });
                } else {
                    // Add new meal
                    let basePrice = newMeal.price - newMeal.price * (newMeal.discount / 100)
                    if (newMeal.selectedExtra) {
                        newMeal.selectedExtra.map(extra => basePrice += Number(extra.price))
                    }
                    if (newMeal.selectedOptions) {
                        newMeal.selectedOptions.map(option => basePrice += Number(option.price))
                    }
                    const tax =
                        set({ meals: [...meals, { ...newMeal, quantity: newMeal.quantity || 1, itemBasePrice: basePrice }] });
                }
            },

            ///===============================================================================================

            increaseQuantity: (targetMeal) => {
                const { meals } = get();
                const updatedMeals = meals.map((meal) => {
                    if (meal.id === targetMeal.id && meal.specialId === targetMeal.specialId && areMealsEqual(meal, targetMeal)) {
                        return { ...meal, quantity: meal.quantity + 1 };
                    }
                    return meal;
                });
                set({ meals: updatedMeals });
            },

            ///===============================================================================================

            decreaseQuantity: (targetMeal) => {
                const { meals } = get();
                const updatedMeals = meals
                    .map((meal) => {
                        if (meal.id === targetMeal.id && meal.specialId === targetMeal.specialId && areMealsEqual(meal, targetMeal)) {
                            return { ...meal, quantity: meal.quantity - 1 };
                        }
                        return meal;
                    })
                    .filter((meal) => meal.quantity > 0); // Remove if quantity becomes 0

                set({ meals: updatedMeals });
            },



            clearCart: () => {
                // localStorage.getItem('cart-storage');
                set({
                    restaurantId: null,
                    branchId: null,
                    meals: [],
                    discountCode: null,
                });
            },

        }), {
        name: 'cart-storage', // LocalStorage key
        partialize: (state) => ({
            // persist only the serializable part of the state
            restaurantId: state.restaurantId,
            branchId: state.branchId,
            meals: state.meals,
            discountCode: state.discountCode,
        }),
    }
    )
)

/* 

*/