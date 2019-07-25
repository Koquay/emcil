export class Product {
    public _id:String;
    public product_no: Number;
    public gender: String;
    public product_type: String;
    public name: String;
    public description: String;
    public brand: String;
    public color: String;
    public price: Number;
    public list_price: Number;
    public available_sizes:String[] = [];
    public images:String[] = [];
    public created_on: Date;
}
