import { sortByIdDesc } from "./sortById";

export const areMealsEqual = (mealA, mealB) => {
    const sizeA = mealA?.selectedSize ?? null;
    const sizeB = mealB?.selectedSize ?? null;

    const optionsA = JSON.stringify(sortByIdDesc(mealA?.selectedOptions ?? []));
    const optionsB = JSON.stringify(sortByIdDesc(mealB?.selectedOptions ?? []));

    const extrasA = JSON.stringify(sortByIdDesc(mealA?.selectedExtra ?? []));
    const extrasB = JSON.stringify(sortByIdDesc(mealB?.selectedExtra ?? []));

    return sizeA === sizeB && optionsA === optionsB && extrasA === extrasB;
};