import { model, Schema, Types} from 'mongoose';
import { Food, FoodSchema } from './food.models';
import { OrderStatus } from '../constant/order_status';

export interface LatLng{    //we use interfaces for code completion
    lat:string;
    lng:string;
}
export const LatLngSchema = new Schema<LatLng>(   //we use schema and mongoose for creating models inside db
    {
        lat: {type: String, required: true},
        lng: {type: String, required: true}
    }
);

//next we create orderitem bcoz we need it in order
export interface OrderItem{
    food:Food;
    price: number;
    quantity: number
}
export const OrderItemSchema = new Schema<OrderItem>(
    {
        food:{type: FoodSchema, required: true},
        price:{type: Number, required: true},
        quantity:{type: Number, required: true}
    }
);

export interface Order{
    id:string;
    items:OrderItem[];
    totalPrice:number;
    name: string;
    address: string;
    addressLatLng: LatLng;
    paymentId: string;
    status: OrderStatus;
    user: Types.ObjectId;  //will be used for foreign key, types comes from typescript
    createdAt: Date;
    updatedAt: Date;
}
export const OrderSchema = new Schema<Order>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    addressLatLng: {type: LatLngSchema, required: true},
    paymentId: {type: String},
    totalPrice: {type: Number, required: true},
    items: {type: [OrderItemSchema], required: true},
    status: {type: String, default: OrderStatus.NEW},
    user: {type: Schema.Types.ObjectId, required:true}       //types comes from schema
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
    //by doing these we can have id instead of _id
    //and we can have many features
});

export const OrderModel = model('order', OrderSchema);
   