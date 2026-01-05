export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export interface OrderItem {
    productId: number;
    quantity: number;
}

export interface Order {
    id: number;
    items: OrderItem[];
    totalPrice: number;
    createdAt: Date;
}

export const products:Product[] = [
    {id:1, name:"Laptop",price:5000000, stock:20},
    {id:2, name:"Mouse Wireless",price:250000, stock:15},
    {id:3, name:"Keyboard",price:300000, stock:25}
]


export const orders: Order[] = [
    {
    id: 1,
    items: [
        { productId:1, quantity:1 },
        { productId:2, quantity:1 },
        { productId:3, quantity:1 },
    ],
    totalPrice: 5550000,
    createdAt: new Date(),
    },
];

