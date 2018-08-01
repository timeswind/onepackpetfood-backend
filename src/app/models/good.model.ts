export interface goodTableDisplayScheme {
    _id: string;
    name: string;
    view_count: number;
    stock: number;
    total_sales_count: number;
    created_at: Date;
    images: string[];
}

export interface priceSetScheme {
    name: string;
    price: number;
    count: number
}

export interface extraScheme {
    key: string;
    value: string;
}

export interface specificationScheme {
    key: string;
    value: string;
}

export interface Good {
    _id?: string;
    name: string;
    description: string;
    images: string[];
    root_category: string;
    category: string;
    subtitle: string;
    cost_price: number;
    price: number;
    price_sets: priceSetScheme[];
    strike_price: number;
    stock: number;
    show_stock: boolean;
    published: boolean;
    bar_code: string;
    exrtas?: extraScheme[];
    specifications?: specificationScheme[];
}