export interface DropShippingTableModel {
    good_images: string[];
    good_name: string;
    brand_name: string;
    price: number;
    company_name: string;
    contact: string;
    link: string;
}

export interface Dropshipping {
    _id?: string;
    average_shipping_time: string;
    brand_name: string;
    category: string;
    company_name: string;
    contact: string;
    extras: { key: string, value: string }[];
    good_description: string;
    good_images: string[];
    good_name: string;
    link: string;
    cost_price: number;
    price: number;
    price_sets: { name: string, price: number, count: number }[];
    seller_credit: string;
    shipping_cost: string;
    weight: string;
}