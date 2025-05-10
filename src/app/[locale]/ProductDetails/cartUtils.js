// تحميل العناصر من localStorage
export const getCartItems = () => {
    if (!localStorage.getItem("cartItems")) return [];
    return JSON.parse(localStorage.getItem("cartItems")) || [];
};

// تحديث localStorage
export const saveCartItems = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// إضافة عنصر إلى السلة
export const addItemToCart = (newItem) => {
    const cartItems = getCartItems(); // استدعاء العناصر الحالية
    const existingItem = cartItems.find((item) => item.id === newItem.id);

    let updatedCartItems;

    if (existingItem) {
        // إذا كان العنصر موجودًا بالفعل، يتم تحديث الكمية
        updatedCartItems = cartItems.map((item) =>
            item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        // إذا كان العنصر جديدًا، يتم إضافته إلى السلة
        updatedCartItems = [...cartItems, { ...newItem, quantity: 1 }];
    }

    saveCartItems(updatedCartItems); // تحديث التخزين
    return updatedCartItems; // إرجاع السلة الجديدة
};

// إزالة عنصر من السلة
export const removeItemFromCart = (itemId) => {
    const cartItems = getCartItems(); // استدعاء العناصر الحالية
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    saveCartItems(updatedCartItems); // تحديث التخزين
    return updatedCartItems; // إرجاع السلة الجديدة
};
