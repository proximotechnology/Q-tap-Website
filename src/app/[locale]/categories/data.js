export const menuItems = [
    {
        id: 1,
        title: "Main Dishes",
        image: "/images/mainDishes.jpg",
        price: "230.00",
        availability: "Available",
        rating: 5.0,
        brief: "Brief",
        calories: 400,
        prepTime: "20" ,
    },
    {
        id: 2,
        title: "Shawarma",
        image: "/images/Shawarma.jpeg",
        price: "90.00",
        availability: "UnAvailable",
        rating: 5.0,
        brief: "Brief",
        calories: 60,
        prepTime: "10" ,

    },
    {
        id: 3,
        title: "Burger",
        image: "/images/burger.jpeg",
        price: "130.00",
        availability: "Available",
        rating: 5.0,
        brief: "Brief",
        calories: 100,
        prepTime: "60" ,


    },
    {
        id: 4,
        title: "Drinks",
        image: "/images/Cappuccino.jpeg",
        price: "150.00",
        availability: "Available",
        rating: 5.0,
        brief: "Brief",
        calories: 120,
        prepTime: "12" ,

    },
    {
        id: 5,
        title: "Pasta",
        image: "/images/Shawarma.jpeg",
        price: "160.00",
        availability: "UnAvailable",
        rating: 5.0,
        brief: "Brief",
        calories: 40,
        prepTime: "90" ,

    },
    {
        id: 6,
        title: "Desserts",
        image: "/images/burger.jpeg",
        price: "160.00",
        availability: "Available",
        rating: 5.0,
        brief: "Brief",
        calories: 220,
        prepTime: "22" ,

    },
    {
        id: 7,
        title: "Steak",
        image: "/images/steak.jpeg",
        price: "190.00",
        availability: "UnAvailable",
        rating: 5.0,
        brief: "Brief",
        calories: 100,
        prepTime: "30" ,

    },
];


export const categoryProducts = {
    "1": [
        {
            id: 101,
            name: "Grilled Chicken",
            image:"/images/mainDishes.jpg",
            price: "120.00",
            availability: "Available",
            rating: 4.5,
            brief: "Juicy grilled chicken with spices",
            calories: 250,
            prepTime: "30",
           category: "Pizza"
        },
        {
            id: 102,
            name: "Beef Kebab",
            image: "/images/mainDishes.jpg",
            price: "180.00",
            availability: "Available",
            rating: 4.8,
            brief: "Tender beef kebabs with grilled veggies",
            calories: 300,
            prepTime: "40",
          category: "Pizza"
        },
    ],
    "2": [
        {
            id: 201,
            name: "Chicken Shawarma",
            image: "/images/Shawarma.jpeg",
            price: "90.00",
            availability: "Available",
            rating: 5.0,
            brief: "Classic chicken shawarma with garlic sauce",
            calories: 150,
            prepTime: "15",
        category: "Pasta"
        },
        {
            id: 202,
            name: "Beef Shawarma",
            image:"/images/Shawarma.jpeg",
            price: "100.00",
            availability: "Unavailable",
            rating: 4.7,
            brief: "Rich beef shawarma with tahini sauce",
            calories: 180,
            prepTime: "20",
            category: "Pasta"
        },
    ],
    "3": [
        {
            id: 301,
            name: "Chicken Burger",
            image:"/images/burger.jpeg",
            price: "120.00",
            availability: "Available",
            rating: 4.6,
            brief: "Crispy chicken burger with mayo",
            calories: 350,
            prepTime: "20",
           category: "Burger"
        },
        {
            id: 302,
            name: "Classic Beef Burger",
            image:  "/images/burger.jpeg",
            price: "130.00",
            availability: "Available",
            rating: 4.9,
            brief: "Classic beef burger with cheese and lettuce",
            calories: 400,
            prepTime: "25",
            category: "Burger"

        },
        {
            id: 303,
            name: "Chicken Burger",
            image:  "/images/burger.jpeg",
            price: "120.00",
            availability: "Available",
            rating: 4.6,
            brief: "Crispy chicken burger with mayo",
            calories: 350,
            prepTime: "20",
           category: "Burger"

        },
    ],
    "4": [
        {
            id: 401,
            name: "Cappuccino",
            image:'/images/Cappuccino.jpeg',
            price: "50.00",
            availability: "Available",
            rating: 4.7,
            brief: "Hot cappuccino with creamy froth",
            calories: 120,
            prepTime: "5",
           category: "Drinks"
        },
        {
            id: 402,
            name: "Orange Juice",
            image: "/images/Cappuccino.jpeg",
            price: "30.00",
            availability: "Available",
            rating: 4.8,
            brief: "Freshly squeezed orange juice",
            calories: 80,
            prepTime: "3",
            category: "Drinks"
        },
    ],
    "5": [
        {
            id: 501,
            name: "Spaghetti Bolognese",
            image: "/images/Shawarma.jpeg",
            price: "160.00",
            availability: "Available",
            rating: 4.9,
            brief: "Classic spaghetti with rich meat sauce",
            calories: 500,
            prepTime: "40",
            category: "Steak" 
        },
        {
            id: 502,
            name: "Penne Alfredo",
            image:"/images/Shawarma.jpeg",
            price: "150.00",
            availability: "Unavailable",
            rating: 4.7,
            brief: "Creamy penne pasta with Alfredo sauce",
            calories: 450,
            prepTime: "30",
            category: "Steak" 
        },
    ],
    "6": [
        {
            id: 601,
            name: "Cheesecake",
            image: "/images/burger.jpeg",
            price: "90.00",
            availability: "Available",
            rating: 5.0,
            brief: "Rich cheesecake with berry topping",
            calories: 300,
            prepTime: "15",
            category: "Dessert"

        },
        {
            id: 602,
            name: "Chocolate Cake",
            image: "/images/burger.jpeg",
            price: "100.00",
            availability: "Available",
            rating: 4.9,
            brief: "Moist chocolate cake with fudge icing",
            calories: 400,
            prepTime: "20",
         category: "Dessert"
        },
    ],
    "7": [
        {
            id: 801,
            name: "T-Bone Steak",
            image: "/images/steak.jpeg",
            price: "190.00",
            availability: "Available",
            rating: 5.0,
            brief: "Juicy T-bone steak with herbs",
            calories: 450,
            prepTime: "50",
            category :"Burger"

        },
        {
            id: 802,
            name: "Ribeye Steak",
            image:  "/images/steak.jpeg",
            price: "200.00",
            availability: "Unavailable",
            rating: 4.8,
            brief: "Tender ribeye steak grilled to perfection",
            calories: 500,
            prepTime: "60",
            category :"Pizza"

        },
    ],
};


export const specialOffers = [
    {
        id: 1,
        name: "Shawarma",
        oldPrice: "150.00",
        newPrice: "100.00",
        imageUrl: "/images/Shawarma.jpeg",
        discount:"10",
    },
    {
        id: 2,
        name: "Burger",
        oldPrice: "150.00",
        newPrice: "100.00",
        imageUrl: "/images/burger.jpeg",
        discount:"20",
    },
];

export const options = [
    { id: 1, name: "Name Here 1", price: 10 },
    { id: 2, name: "Name Here 2", price: 20 },
    { id: 3, name: "Name Here 3", price: 0 }, 
    { id: 4, name: "Name Here 4", price: 10 },
];
export const ingrediants= [
    { id: 1, name: "Name Here 1" },
    { id: 2, name: "Name Here 2" },
    { id: 3, name: "Name Here 3"}, 
    { id: 4, name: "Name Here 4" },
];

export const ordersDetails = [
    {
        id: 3218,
        date: "21 Sep 2024",
        time: "3:50 PM",
        status: "Unpaid",
        preparationTime: "30 minutes"
    },
    {
        id: 3219,
        date: "22 Sep 2024",
        time: "1:30 PM",
        status: "Paid",
        preparationTime: "20 minutes"
    },
    {
        id: 3220,
        date: "23 Sep 2024",
        time: "5:00 PM",
        status: "Unpaid",
        preparationTime: "45 minutes"
    }
];


