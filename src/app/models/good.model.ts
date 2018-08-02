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

export interface GoodInterface {
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
    detail?: string;
}

export class Good implements GoodInterface {
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
    detail?: string;

    constructor() { }

    public initFromData(data: any): void {
        this._id = data._id
        this.name = data.name
        this.description = data.description
        this.images = data.images
        this.root_category = data.root_category
        this.category = data.category
        this.subtitle = data.subtitle
        this.cost_price = data.cost_price
        this.price = data.price
        this.price_sets = data.price_sets
        this.strike_price = data.strike_price
        this.stock = data.stock
        this.show_stock = data.show_stock
        this.published = data.published
        this.bar_code = data.bar_code
        this.exrtas = data.exrtas
        this.specifications = data.specifications
        this.detail = data.detail
    }

    public toObject(): GoodInterface {
        const obj: GoodInterface = {
            _id: this._id,
            name: this.name,
            description: this.description,
            images: this.images,
            root_category: this.root_category,
            category: this.category,
            subtitle: this.subtitle,
            cost_price: this.cost_price,
            price: this.price,
            price_sets: this.price_sets,
            strike_price: this.strike_price,
            stock: this.stock,
            show_stock: this.show_stock,
            published: this.published,
            bar_code: this.bar_code,
            exrtas: this.exrtas,
            specifications: this.specifications,
            detail: this.detail
        }
        return obj
    }
}