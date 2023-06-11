import { Cart } from "../CartModel";
import { Payment } from "./OnlinePayment";

export class ProductFormData{
    public UserID;
    public Name;
    public LastName;
    public Date:Date;
    public Address;
    public City;
    public Region;
    public Code;
    public Country;
    public Products:Cart[];
    public CardDetails:Payment;
}
