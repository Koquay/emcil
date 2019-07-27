export class Product {
    public _id: string;
    public product_no: number;
    public gender: string;
    public product_type: string;
    public name: string;
    public description: string;
    public brand: string;
    public color: string;
    public price: number;
    public list_price: number;
    public available_sizes: string[] = [];
    public images: string[] = [];
    public created_on: Date;
}

export class Address {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    province: string;
    postal_code: string
};

export class Payment {
    credit_card_no: string;
    cw: string;
    exp_month: string;
    exp_year: string;
}

export class Customer {
    shippingAndBillingSame:boolean = true;
    shipping_address: Address;
    billing_address: Address;    
    payment: Payment;

    constructor() {
        this.shipping_address = new Address();
        this.billing_address = new Address();    
        this.payment = new Payment();
    }
};

export class OrderItem {
    product_no: number;
    quantity: number;
    price: number;
    size: string;
    shipped: boolean;
    shipped_date: string;
    cancelled: boolean;
    cancelled_date: Date;
}

export class Order {
    order_no: number;
    order_date: Date;
    shipped: boolean;
    shipped_date: Date;
    cancelled: boolean;
    cancelled_date: Date;
    delivery_date: Date;
    discount: number;
    tax: number;
    subtotal: number;
    total: number;
    customer: Customer;
    order_items: OrderItem[] = [];
    special_instructions: string;
    created_on:Date;    

    constructor() {
        this.customer = new Customer();        
    }
}

